import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface TimerProps {
  isActive: boolean;
  currentTurn: "player" | "computer";
  onTimeUp: () => void;
  timeLimit?: number;
  player: "player" | "computer";
}

export const Timer = ({ isActive, currentTurn, onTimeUp, timeLimit = 300, player }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const { t } = useTranslation();
  const isMyTurn = currentTurn === player;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && isMyTurn) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isMyTurn, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-48">
      <div className="text-center mb-2">
        {t("time")}: {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
      <Progress 
        value={(timeLeft / timeLimit) * 100} 
        className={isMyTurn ? "bg-gray-200" : "bg-gray-100"}
      />
    </div>
  );
};