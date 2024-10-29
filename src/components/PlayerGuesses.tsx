import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, CircleDot } from "lucide-react";

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

  const renderResult = (result: string) => {
    const [plus, minus] = result.split("+")[0] === "" ? [0, parseInt(result)] : result.split("+").map(num => parseInt(num));
    return (
      <div className="flex gap-1 items-center">
        {[...Array(plus)].map((_, i) => (
          <CircleDot key={`plus-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-teal-500 fill-teal-500" />
        ))}
        {[...Array(minus)].map((_, i) => (
          <CircleDot key={`minus-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-amber-500 fill-amber-500" />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-teal-50 border-teal-200">
      <CardHeader className="pb-2 md:pb-3 space-y-2">
        <ColorLegend />
        <CardTitle className="flex items-center gap-2 text-teal-700 text-base md:text-lg">
          <User className="w-4 h-4 md:w-5 md:h-5" />
          Your Guesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5 md:space-y-2">
          {playerGuesses.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 md:p-3 bg-white rounded-lg shadow-sm border border-teal-100 text-sm md:text-base"
            >
              <span className="font-medium text-teal-800">Turn {entry.turn}</span>
              <span className="font-bold text-teal-900">{entry.guess}</span>
              {renderResult(entry.result)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};