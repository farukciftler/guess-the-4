import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface GameSetupProps {
  playerNumber: string;
  setPlayerNumber: (value: string) => void;
  onStartGame: () => void;
}

export const GameSetup = ({ playerNumber, setPlayerNumber, onStartGame }: GameSetupProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleNumberChange = (value: string) => {
    if (value[0] === "0") {
      toast({
        title: t("invalidNumber"),
        description: t("invalidFirstDigit"),
        variant: "destructive",
      });
      return;
    }
    setPlayerNumber(value);
  };

  return (
    <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
      <h2 className="text-xl mb-4 text-center text-gray-800">{t("gameSetup")}</h2>
      <div className="space-y-4">
        <p className="text-sm text-gray-600 text-center">
          {t("enterValidNumber")}
        </p>
        <div className="flex gap-4 justify-center">
          <Input
            type="text"
            maxLength={4}
            value={playerNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            className="bg-white border-gray-300 w-48"
            placeholder={t("enterValidNumber")}
          />
          <Button 
            onClick={onStartGame}
            className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
          >
            {t("startGame")}
          </Button>
        </div>
      </div>
    </Card>
  );
};