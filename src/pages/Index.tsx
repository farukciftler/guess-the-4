import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { GameResult } from "@/components/GameResult";
import { GameSetup } from "@/components/GameSetup";
import { ActiveGame } from "@/components/ActiveGame";
import { generateSecretNumber, evaluateGuess } from "@/lib/gameLogic";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Index = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isHost, playerName, timePerPlayer, mode } = location.state || {};
  const { toast } = useToast();
  
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
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!playerName || !roomId) {
      navigate('/');
    }

    if (mode === "computer") {
      setOpponentNumber(generateSecretNumber());
    }
  }, [playerName, roomId, navigate, mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !winner) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, winner]);

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
    setTimeout(() => {
      makeComputerGuess();
    }, 1000);
  };

  const makeComputerGuess = () => {
    if (!gameStarted || winner) return;
    
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
      setTurnCount(prev => prev + 1);
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
        setTimeout(() => {
          makeComputerGuess();
        }, 1000);
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
        
        {winner ? (
          <GameResult
            winner={winner}
            winningTurn={winningTurn}
            playerName={playerName}
            opponentName={getOpponentName()}
            timeElapsed={timeElapsed}
            history={history}
            onBackToMenu={() => navigate('/')}
          />
        ) : !gameStarted ? (
          <GameSetup 
            playerNumber={playerNumber}
            setPlayerNumber={setPlayerNumber}
            onStartGame={handleStartGame}
          />
        ) : (
          <ActiveGame
            gameStarted={gameStarted}
            currentTurn={currentTurn}
            onTimeUp={() => {
              setWinner("computer");
              setWinningTurn(turnCount);
            }}
            timePerPlayer={timePerPlayer}
            history={history}
            onGuess={handlePlayerGuess}
          />
        )}
      </div>
    </div>
  );
};

export default Index;