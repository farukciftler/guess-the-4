import { Timer } from "@/components/Timer";
import { PlayerGuesses } from "@/components/PlayerGuesses";
import { ComputerGuesses } from "@/components/ComputerGuesses";
import PlayerGuessInput from "@/components/PlayerGuessInput";

interface ActiveGameProps {
  gameStarted: boolean;
  currentTurn: "player" | "computer";
  onTimeUp: () => void;
  timePerPlayer: number;
  history: Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>;
  onGuess: (guess: string) => void;
  showTimer: boolean;
  opponentName: string;
}

export const ActiveGame = ({
  gameStarted,
  currentTurn,
  onTimeUp,
  timePerPlayer,
  history,
  onGuess,
  showTimer,
  opponentName
}: ActiveGameProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        {showTimer && (
          <Timer
            isActive={gameStarted}
            currentTurn={currentTurn}
            onTimeUp={onTimeUp}
            timeLimit={timePerPlayer * 60}
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlayerGuesses history={history} />
        <ComputerGuesses history={history} opponentName={opponentName} />
      </div>

      {currentTurn === "player" && gameStarted && (
        <div className="flex justify-center">
          <PlayerGuessInput onGuess={onGuess} />
        </div>
      )}
    </div>
  );
};