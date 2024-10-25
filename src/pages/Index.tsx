import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Timer } from "@/components/Timer";
import { GameHistory } from "@/components/GameHistory";
import PlayerGuessInput from "@/components/PlayerGuessInput";
import { generateSecretNumber, evaluateGuess } from "@/lib/gameLogic";

const Index = () => {
  const [playerNumber, setPlayerNumber] = useState("");
  const [computerNumber] = useState(generateSecretNumber());
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
    // Simple computer strategy - random valid guess
    const guess = generateSecretNumber();
    const result = evaluateGuess(playerNumber, guess);
    
    setHistory(prev => [...prev, {
      turn: turnCount,
      guess,
      result,
      player: "computer"
    }]);

    if (result === "4+") {
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

    const result = evaluateGuess(computerNumber, guess);
    
    setHistory(prev => [...prev, {
      turn: turnCount,
      guess,
      result,
      player: "player"
    }]);

    if (result === "4+") {
      setWinner("player");
      setWinningTurn(turnCount);
    } else {
      setTurnCount(prev => prev + 1);
      setCurrentTurn("computer");
      setTimeout(makeComputerGuess, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Number Guessing Game</h1>
        
        {!gameStarted ? (
          <Card className="p-6 bg-gray-800 border-gray-700">
            <h2 className="text-xl mb-4">Enter your 4-digit number:</h2>
            <div className="flex gap-4">
              <Input
                type="text"
                maxLength={4}
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter 4 unique digits"
              />
              <Button onClick={handleStartGame}>Start Game</Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-xl">
                Turn: {turnCount} | Current: {currentTurn === "player" ? "Your" : "Computer's"} turn
              </div>
              <Timer
                isActive={gameStarted && !winner}
                currentTurn={currentTurn}
                onTimeUp={() => {
                  setWinner(currentTurn === "player" ? "computer" : "player");
                  setWinningTurn(turnCount);
                }}
              />
            </div>

            {winner ? (
              <Card className="p-6 bg-gray-800 border-gray-700">
                <h2 className="text-2xl mb-4">
                  {winner === "player" ? "Congratulations! You won!" : "Game Over! Computer won!"}
                </h2>
                <p>Winning turn: {winningTurn}</p>
                <Button
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </Button>
              </Card>
            ) : (
              currentTurn === "player" && (
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <PlayerGuessInput onGuess={handlePlayerGuess} />
                </Card>
              )
            )}

            <GameHistory history={history} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;