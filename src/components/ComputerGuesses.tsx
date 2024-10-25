import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Computer } from "lucide-react";

interface GuessHistoryItem {
  turn: number;
  guess: string;
  result: string;
  player: "player" | "computer";
}

interface ComputerGuessesProps {
  history: GuessHistoryItem[];
}

export const ComputerGuesses = ({ history }: ComputerGuessesProps) => {
  const computerGuesses = history.filter((entry) => entry.player === "computer");

  return (
    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Computer className="w-5 h-5" />
          Computer's Guesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {computerGuesses.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white dark:bg-blue-900 rounded-lg shadow-sm"
            >
              <span className="font-medium">Turn {entry.turn}</span>
              <span className="text-lg font-bold">{entry.guess}</span>
              <span className="text-blue-600 dark:text-blue-300 font-mono">
                {entry.result}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};