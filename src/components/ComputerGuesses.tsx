import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Computer, CircleDot } from "lucide-react";

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

  const renderResult = (result: string) => {
    const [plus, minus] = result.split("+")[0] === "" ? [0, parseInt(result)] : result.split("+").map(num => parseInt(num));
    return (
      <div className="flex gap-1 items-center">
        {[...Array(plus)].map((_, i) => (
          <CircleDot key={`plus-${i}`} className="w-4 h-4 text-violet-500 fill-violet-500" />
        ))}
        {[...Array(minus)].map((_, i) => (
          <CircleDot key={`minus-${i}`} className="w-4 h-4 text-amber-500 fill-amber-500" />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-violet-50 border-violet-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-violet-700">
          <Computer className="w-5 h-5" />
          Computer's Guesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {computerGuesses.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-violet-100"
            >
              <span className="font-medium text-violet-800">Turn {entry.turn}</span>
              <span className="text-lg font-bold text-violet-900">{entry.guess}</span>
              {renderResult(entry.result)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};