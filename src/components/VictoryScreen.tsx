import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Square, Smartphone } from 'lucide-react';
import html2canvas from 'html2canvas';

interface VictoryScreenProps {
  winner: "player" | "computer";
  winningTurn: number;
  timeElapsed: number;
  playerName: string;
  opponentName: string;
  history: Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>;
  format?: "story" | "square";
}

export const VictoryScreen = ({ 
  winner, 
  winningTurn, 
  timeElapsed,
  playerName,
  opponentName,
  history,
  format = "story" 
}: VictoryScreenProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const playerTurns = history.filter(h => h.player === "player").length;
  const opponentTurns = history.filter(h => h.player === "computer").length;

  const downloadImage = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2
    });
    
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `victory-${format}.png`;
    link.click();
  };

  const shareImage = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2
    });
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.share({
          files: [new File([blob], 'victory.png', { type: 'image/png' })],
          title: 'My Victory in Number Guessing Game!',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={cardRef}
        className={`relative overflow-hidden bg-gradient-to-br from-violet-500 to-teal-500 text-white p-8 ${
          format === "story" ? "w-[360px] h-[640px]" : "w-[600px] h-[600px]"
        }`}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Number Guessing Game</h1>
            <div className="text-2xl font-semibold mb-8">
              {winner === "player" ? "Victory!" : "Game Over!"}
            </div>
          </div>

          <div className="space-y-6 text-center flex-1 flex flex-col justify-center">
            <div className="text-xl">
              <div className="mb-4">
                {winner === "player" ? (
                  <span className="text-2xl font-bold">{playerName} Won!</span>
                ) : (
                  <span className="text-2xl font-bold">{opponentName} Won!</span>
                )}
              </div>
              <div className="space-y-2">
                <p>Winning Turn: {winningTurn}</p>
                <p>Time: {minutes}m {seconds}s</p>
                <p>{playerName}'s Turns: {playerTurns}</p>
                <p>{opponentName}'s Turns: {opponentTurns}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-center opacity-75">
            Play at yourgame.com
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => downloadImage()} variant="outline">
          <Square className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button onClick={() => shareImage()}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};