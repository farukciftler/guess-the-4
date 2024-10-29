import { useState, useEffect, useRef } from "react";
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
  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isActive && isMyTurn) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const deltaTime = Math.max(1000, now - lastUpdateTime.current); // Ensure minimum 1 second
        lastUpdateTime.current = now;
        
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - Math.floor(deltaTime / 1000));
          if (newTime <= 0) {
            clearInterval(intervalId);
            onTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
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