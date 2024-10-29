import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Scoreboard } from "@/components/Scoreboard";
import { getStoredScores } from "@/lib/scoring";

export const ScoreboardPage = () => {
  const navigate = useNavigate();
  const scores = getStoredScores();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        <Scoreboard scores={scores} />
      </div>
    </div>
  );
};