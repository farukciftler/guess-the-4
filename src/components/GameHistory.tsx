import { Card } from "@/components/ui/card";

interface GameHistoryProps {
  history: Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>;
}

export const GameHistory = ({ history }: GameHistoryProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-xl mb-4">Game History</h2>
      <div className="space-y-2">
        {history.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-gray-700 rounded"
          >
            <span>Turn {entry.turn}</span>
            <span>{entry.player === "player" ? "You" : "Computer"}</span>
            <span>Guess: {entry.guess}</span>
            <span>Result: {entry.result}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};