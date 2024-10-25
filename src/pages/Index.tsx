import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Timer } from "@/components/Timer";
import { ComputerGuesses } from "@/components/ComputerGuesses";
import { PlayerGuesses } from "@/components/PlayerGuesses";
import PlayerGuessInput from "@/components/PlayerGuessInput";
import { generateSecretNumber, evaluateGuess } from "@/lib/gameLogic";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Index = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isHost, playerName, timePerPlayer, mode } = location.state || {};
  
  const [playerNumber, setPlayerNumber] = useState("");
  const [opponentNumber, setOpponentNumber] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<"player" | "computer">("computer");
  const [history, setHistory] = useState<Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>>([]);
  const [turnCount, setTurnCount] = useState(1);
  const [winner, setWinner] = useState<"player" | "computer" | null>(null);
  const [winningTurn, setWinningTurn] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!playerName || !roomId) {
      navigate('/');
    }

    // If playing against computer, generate computer's number
    if (mode === "computer") {
      setOpponentNumber(generateSecretNumber());
    }
  }, [playerName, roomId, navigate, mode]);

  const isValidNumber = (num: string) => {
    const digits = new Set(num.split(""));
    return num.length === 4 && digits.size === 4 && !isNaN(Number(num));
  };

  const handleStartGame = () => {
    if (!isValidNumber(playerNumber)) {
      toast({
        title: "Invalid number",
        description: "Please enter a 4-digit number with unique digits",
        variant: "destructive",
      });
      return;
    }
    setGameStarted(true);
    makeComputerGuess();
  };

  const makeComputerGuess = () => {
    const guess = generateSecretNumber();
    const result = evaluateGuess(playerNumber, guess);
    
    setHistory(prev => [...prev, {
      turn: turnCount,
      guess,
      result,
      player: "computer"
    }]);

    if (result === "4+0-") {
      setWinner("computer");
      setWinningTurn(turnCount);
    } else {
      setCurrentTurn("player");
    }
  };

  const handlePlayerGuess = (guess: string) => {
    if (!isValidNumber(guess)) {
      toast({
        title: "Invalid guess",
        description: "Please enter a 4-digit number with unique digits",
        variant: "destructive",
      });
      return;
    }

    const result = evaluateGuess(opponentNumber, guess);
    
    setHistory(prev => [...prev, {
      turn: turnCount,
      guess,
      result,
      player: "player"
    }]);

    if (result === "4+0-") {
      setWinner("player");
      setWinningTurn(turnCount);
    } else {
      setTurnCount(prev => prev + 1);
      setCurrentTurn("computer");
      if (mode === "computer") {
        setTimeout(makeComputerGuess, 1000);
      }
    }
  };

  const getOpponentName = () => {
    return mode === "computer" ? "Computer" : "Opponent";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
            Number Guessing Game
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-600">Room ID: {roomId}</div>
            <div className="text-sm text-gray-600">Player: {playerName}</div>
            <div className="text-sm text-gray-600">Mode: {mode === "computer" ? "vs Computer" : "Multiplayer"}</div>
          </div>
        </div>
        
        {!gameStarted ? (
          <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
            <h2 className="text-xl mb-4 text-center text-gray-800">Enter your 4-digit number:</h2>
            <div className="flex gap-4 justify-center">
              <Input
                type="text"
                maxLength={4}
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
                className="bg-white border-gray-300 w-48"
                placeholder="Enter 4 unique digits"
              />
              <Button 
                onClick={handleStartGame}
                className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
              >
                Start Game
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/80 p-4 rounded-lg backdrop-blur-lg">
              <div className="text-xl text-gray-800">
                Turn: {turnCount} | Current: {currentTurn === "player" ? "Your" : `${getOpponentName()}'s`} turn
              </div>
              <Timer
                isActive={gameStarted && !winner}
                currentTurn={currentTurn}
                onTimeUp={() => {
                  setWinner(currentTurn === "player" ? "computer" : "player");
                  setWinningTurn(turnCount);
                }}
                timeLimit={timePerPlayer * 60}
              />
            </div>

            {winner ? (
              <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
                <h2 className="text-2xl mb-4 text-center">
                  {winner === "player" ? (
                    <span className="text-teal-500">Congratulations! You won!</span>
                  ) : (
                    <span className="text-violet-500">Game Over! {getOpponentName()} won!</span>
                  )}
                </h2>
                <p className="text-center mb-4 text-gray-700">Winning turn: {winningTurn}</p>
                <div className="flex justify-center">
                  <Button
                    className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
                    onClick={() => navigate('/')}
                  >
                    Back to Menu
                  </Button>
                </div>
              </Card>
            ) : (
              currentTurn === "player" && (
                <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
                  <PlayerGuessInput onGuess={handlePlayerGuess} />
                </Card>
              )
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComputerGuesses history={history} />
              <PlayerGuesses history={history} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;