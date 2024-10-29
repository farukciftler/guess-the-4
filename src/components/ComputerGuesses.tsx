import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Computer, CircleDot } from "lucide-react";
import { ColorLegend } from "./ColorLegend";
import { useTranslation } from "react-i18next";

interface GuessHistoryItem {
  turn: number;
  guess: string;
  result: string;
  player: "player" | "computer";
}

interface ComputerGuessesProps {
  history: GuessHistoryItem[];
  opponentName: string;
}

export const ComputerGuesses = ({ history, opponentName }: ComputerGuessesProps) => {
  const { t } = useTranslation();
  const computerGuesses = history
    .filter((entry) => entry.player === "computer")
    .sort((a, b) => a.turn - b.turn);

  const renderResult = (result: string) => {
    const [plus, minus] = result.split("+")[0] === "" 
      ? [0, parseInt(result)] 
      : result.split("+").map(num => parseInt(num));
      
    return (
      <div className="flex gap-1 items-center">
        {[...Array(plus)].map((_, i) => (
          <CircleDot key={`plus-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-violet-500 fill-violet-500" />
        ))}
        {[...Array(minus)].map((_, i) => (
          <CircleDot key={`minus-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-amber-500 fill-amber-500" />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-violet-50 border-violet-200">
      <CardHeader className="pb-2 md:pb-3 space-y-2">
        <div className="flex gap-4 text-xs text-gray-600 items-center">
          <div className="flex items-center gap-1">
            <CircleDot className="w-3 h-3 text-violet-500 fill-violet-500" />
            <span>{t("correctPosition")}</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleDot className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{t("wrongPosition")}</span>
          </div>
        </div>
        <CardTitle className="flex items-center gap-2 text-violet-700 text-base md:text-lg">
          <Computer className="w-4 h-4 md:w-5 md:h-5" />
          {opponentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5 md:space-y-2">
          {computerGuesses.map((entry, index) => (
            <div
              key={`${entry.turn}-${index}`}
              className="flex justify-between items-center p-2 md:p-3 bg-white rounded-lg shadow-sm border border-violet-100 text-sm md:text-base"
            >
              <span className="font-medium text-violet-800">Turn {entry.turn}</span>
              <span className="font-bold text-violet-900">{entry.guess}</span>
              {renderResult(entry.result)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};