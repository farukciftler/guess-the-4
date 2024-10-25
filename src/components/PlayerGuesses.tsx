import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface GuessHistoryItem {
  turn: number;
  guess: string;
  result: string;
  player: "player" | "computer";
}

interface PlayerGuessesProps {
  history: GuessHistoryItem[];
}

export const PlayerGuesses = ({ history }: PlayerGuessesProps) => {
  const playerGuesses = history.filter((entry) => entry.player === "player");

  return (
    <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <User className="w-5 h-5" />
          Your Guesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {playerGuesses.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white dark:bg-green-900 rounded-lg shadow-sm"
            >
              <span className="font-medium">Turn {entry.turn}</span>
              <span className="text-lg font-bold">{entry.guess}</span>
              <span className="text-green-600 dark:text-green-300 font-mono">
                {entry.result}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};