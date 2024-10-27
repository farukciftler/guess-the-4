import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Square, CircleDot } from 'lucide-react';
import html2canvas from 'html2canvas';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  playerNumber: string;
  opponentNumber: string;
}

export const VictoryScreen = ({ 
  winner, 
  winningTurn, 
  timeElapsed,
  playerName,
  opponentName,
  history,
  playerNumber,
  opponentNumber
}: VictoryScreenProps) => {
  const wideRef = useRef<HTMLDivElement>(null);
  const tallRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const playerGuesses = history.filter(h => h.player === "player");
  const opponentGuesses = history.filter(h => h.player === "computer");

  const renderResult = (result: string) => {
    const [plus, minus] = result.split("+")[0] === "" ? [0, parseInt(result)] : result.split("+").map(num => parseInt(num));
    return (
      <div className="flex gap-1 items-center">
        {[...Array(plus)].map((_, i) => (
          <CircleDot key={`plus-${i}`} className="w-3 h-3 text-violet-500 fill-violet-500" />
        ))}
        {[...Array(minus)].map((_, i) => (
          <CircleDot key={`minus-${i}`} className="w-3 h-3 text-amber-500 fill-amber-500" />
        ))}
      </div>
    );
  };

  const downloadImage = async (ref: React.RefObject<HTMLDivElement>, format: string) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      backgroundColor: null,
      scale: 2
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `victory-${format}.png`;
    link.click();
  };

  const shareImage = async (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
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

  const renderGameSummary = (className: string) => (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Game Summary</h1>
        <div className="text-xl font-semibold text-violet-600">
          {winner === "player" ? `${playerName} Won!` : `${opponentName} Won!`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="font-semibold text-violet-700">{playerName}</div>
          <div className="text-sm">Secret: {playerNumber}</div>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-teal-700">{opponentName}</div>
          <div className="text-sm">Secret: {opponentNumber}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto">
        <div className="space-y-2">
          <div className="font-medium mb-2">Your Guesses:</div>
          {playerGuesses.map((guess, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg text-sm">
              <span>{guess.guess}</span>
              {renderResult(guess.result)}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="font-medium mb-2">{opponentName}'s Guesses:</div>
          {opponentGuesses.map((guess, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg text-sm">
              <span>{guess.guess}</span>
              {renderResult(guess.result)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Game Duration</div>
            <div>{minutes}m {seconds}s</div>
          </div>
          <div>
            <div className="font-medium">Winning Turn</div>
            <div>Turn {winningTurn}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Carousel className="w-full max-w-xl">
        <CarouselContent>
          <CarouselItem>
            <div ref={wideRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-6 rounded-lg shadow-lg w-full aspect-video">
              {renderGameSummary("text-sm")}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div ref={tallRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-6 rounded-lg shadow-lg w-full aspect-[3/4]">
              {renderGameSummary("text-xs")}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div ref={squareRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-6 rounded-lg shadow-lg w-full aspect-square">
              {renderGameSummary("text-xs")}
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex gap-2">
        <Button onClick={() => downloadImage(wideRef, '16-9')} variant="outline">
          <Square className="w-4 h-4 mr-2" />
          Download 16:9
        </Button>
        <Button onClick={() => downloadImage(tallRef, '4-3')} variant="outline">
          <Square className="w-4 h-4 mr-2" />
          Download 4:3
        </Button>
        <Button onClick={() => downloadImage(squareRef, '1-1')} variant="outline">
          <Square className="w-4 h-4 mr-2" />
          Download 1:1
        </Button>
        <Button onClick={() => shareImage(wideRef)}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};