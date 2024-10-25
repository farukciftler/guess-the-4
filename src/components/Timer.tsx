import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  isActive: boolean;
  currentTurn: "player" | "computer";
  onTimeUp: () => void;
  timeLimit?: number;
}

export const Timer = ({ isActive, currentTurn, onTimeUp, timeLimit = 300 }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
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
  }, [isActive, currentTurn, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-48">
      <div className="text-center mb-2">
        Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
      <Progress value={(timeLeft / timeLimit) * 100} />
    </div>
  );
};