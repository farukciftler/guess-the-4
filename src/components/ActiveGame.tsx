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
  opponentName,
  mode
}: ActiveGameProps & { mode: "computer" | "multiplayer" }) => {
  return (
    <div className="space-y-6 pb-24 relative min-h-[calc(100vh-16rem)]">
      {showTimer && (
        <div className="flex justify-center gap-8">
          <Timer
            isActive={gameStarted}
            currentTurn={currentTurn}
            onTimeUp={onTimeUp}
            timeLimit={timePerPlayer * 60}
            player="player"
          />
          {mode !== "computer" && (
            <Timer
              isActive={gameStarted}
              currentTurn={currentTurn}
              onTimeUp={onTimeUp}
              timeLimit={timePerPlayer * 60}
              player="computer"
            />
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <PlayerGuesses history={history} />
        <ComputerGuesses history={history} opponentName={opponentName} />
      </div>

      {currentTurn === "player" && gameStarted && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <PlayerGuessInput onGuess={onGuess} />
          </div>
        </div>
      )}
    </div>
  );
};