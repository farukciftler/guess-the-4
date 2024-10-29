import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Score } from "@/lib/types";
import { useTranslation } from "react-i18next";

export const Scoreboard = ({ scores }: { scores: Score[] }) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
          {t("scoreboard")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                <span className="font-medium">{score.playerName}</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{t("turn")}: {score.turn}</span>
                <span>{Math.floor(score.time / 60)}:{(score.time % 60).toString().padStart(2, '0')}</span>
                <span className="font-bold text-violet-600">{score.score} pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};