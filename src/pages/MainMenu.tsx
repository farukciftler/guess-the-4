import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

export const MainMenu = () => {
  const [playerName, setPlayerName] = useState("");
  const [timePerPlayer, setTimePerPlayer] = useState("5");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const createRoom = () => {
    if (!playerName) {
      toast({
        title: t("invalidNumber"),
        description: t("enterValidNumber"),
        variant: "destructive",
      });
      return;
    }

    const roomId = Math.random().toString(36).substring(2, 9);
    navigate(`/room/${roomId}`, {
      state: { 
        isHost: true, 
        playerName, 
        timePerPlayer: parseInt(timePerPlayer),
        mode: "multiplayer"
      }
    });
  };

  const joinRoom = () => {
    if (!playerName) {
      toast({
        title: t("invalidNumber"),
        description: t("enterValidNumber"),
        variant: "destructive",
      });
      return;
    }
    navigate('/join', { state: { playerName } });
  };

  const playVsComputer = () => {
    if (!playerName) {
      toast({
        title: t("invalidNumber"),
        description: t("enterValidNumber"),
        variant: "destructive",
      });
      return;
    }

    const roomId = "computer-" + Math.random().toString(36).substring(2, 9);
    navigate(`/room/${roomId}`, {
      state: { 
        isHost: true, 
        playerName, 
        timePerPlayer: parseInt(timePerPlayer),
        mode: "computer"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-900 p-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
            {t("gameTitle")}
          </h1>
          <LanguageSelector />
        </div>

        <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{t("yourName")}</label>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t("enterName")}
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t("timePerPlayer")}</label>
              <Select value={timePerPlayer} onValueChange={setTimePerPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder={t("timePerPlayer")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 {t("minutes")}</SelectItem>
                  <SelectItem value="5">5 {t("minutes")}</SelectItem>
                  <SelectItem value="10">10 {t("minutes")}</SelectItem>
                  <SelectItem value="15">15 {t("minutes")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={playVsComputer}
                className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
              >
                {t("playVsComputer")}
              </Button>
              <Button 
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
              >
                {t("createRoom")}
              </Button>
              <Button 
                onClick={joinRoom}
                variant="outline"
                className="w-full"
              >
                {t("joinRoom")}
              </Button>
              <Button 
                onClick={() => navigate('/how-to-play')}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                {t("howToPlay")}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};