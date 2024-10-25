import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VictoryScreen } from './VictoryScreen';

interface GameResultProps {
  winner: "player" | "computer" | null;
  winningTurn: number | null;
  playerName: string;
  opponentName: string;
  timeElapsed: number;
  history: Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>;
  onBackToMenu: () => void;
}

export const GameResult = ({ 
  winner, 
  winningTurn, 
  playerName,
  opponentName,
  timeElapsed,
  history,
  onBackToMenu 
}: GameResultProps) => {
  if (!winner || !winningTurn) return null;

  return (
    <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
      <VictoryScreen
        winner={winner}
        winningTurn={winningTurn}
        timeElapsed={timeElapsed}
        playerName={playerName}
        opponentName={opponentName}
        history={history}
        format="story"
      />
      <div className="mt-4 flex justify-center">
        <Button
          className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
          onClick={onBackToMenu}
        >
          Back to Menu
        </Button>
      </div>
    </Card>
  );
};