import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { GameResult } from "@/components/GameResult";
import { GameSetup } from "@/components/GameSetup";
import { ActiveGame } from "@/components/ActiveGame";
import { generateSecretNumber, evaluateGuess } from "@/lib/gameLogic";
import { makeComputerGuess } from "@/lib/computerStrategy";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isHost, playerName, timePerPlayer, mode } = location.state || {};
  
  const [playerNumber, setPlayerNumber] = useState("");
  const [opponentNumber, setOpponentNumber] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<"player" | "computer">("player");
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
  const [hasCopied, setHasCopied] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState(mode === "computer");

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
    if (gameStarted && !winner && (mode === "computer" || opponentJoined)) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, winner, mode, opponentJoined]);

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId || "");
    setHasCopied(true);
    toast({
      title: "Room ID copied!",
      description: "Share this with your friend to join the game.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

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
    if (mode === "computer") {
      makeComputerMove();
    }
  };

  const makeComputerMove = () => {
    if (!gameStarted || winner) return;
    
    const computerGuesses = history.filter(h => h.player === "computer")
      .map(h => ({ guess: h.guess, result: h.result }));
    
    const guess = makeComputerGuess(computerGuesses);
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
      setCurrentTurn("computer");
      setTimeout(() => {
        if (mode === "computer") {
          makeComputerMove();
        }
      }, 1000);
    }
  };

  const getOpponentName = () => {
    if (mode === "computer") return "Computer";
    return opponentJoined ? "Opponent" : "Waiting for player...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
            Number Guessing Game
          </h1>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 justify-end">
              <div className="text-sm text-gray-600">Room ID: {roomId}</div>
              {mode === "multiplayer" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={copyRoomId}
                      >
                        {hasCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy room ID to share with friends</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
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
            playerNumber={playerNumber}
            opponentNumber={opponentNumber}
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
            showTimer={mode === "computer" || opponentJoined}
            opponentName={getOpponentName()}
          />
        )}
      </div>
    </div>
  );
};

export default Index;