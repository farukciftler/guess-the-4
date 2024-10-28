import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Square, CircleDot, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface VictoryScreenProps {
  winner: "player" | "computer";
  winningTurn: number;
  timeElapsed: number;
  playerName: string;
  opponentName: string;
  opponentTimeElapsed: number;
  history: Array<{
    turn: number;
    guess: string;
    result: string;
    player: "player" | "computer";
  }>;
  format?: "story" | "square";
  playerNumber: string;
  opponentNumber: string;
  roomId?: string;
}

export const VictoryScreen = ({ 
  winner, 
  winningTurn, 
  timeElapsed,
  playerName,
  opponentName,
  opponentTimeElapsed,
  history,
  playerNumber,
  opponentNumber,
  roomId
}: VictoryScreenProps) => {
  const portraitRef = useRef<HTMLDivElement>(null);
  const tallRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const playerMinutes = Math.floor(timeElapsed / 60);
  const playerSeconds = timeElapsed % 60;
  const opponentMinutes = Math.floor(opponentTimeElapsed / 60);
  const opponentSeconds = opponentTimeElapsed % 60;

  const copyRoomId = async () => {
    if (roomId) {
      await navigator.clipboard.writeText(roomId);
      setHasCopied(true);
      toast({
        title: "Room ID copied!",
        description: "Share this with your friend to join the game.",
      });
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const renderResult = (result: string) => {
    const [plus, minus] = result.split("+")[0] === "" ? [0, parseInt(result)] : result.split("+").map(num => parseInt(num));
    return (
      <div className="flex gap-1 items-center">
        {[...Array(plus)].map((_, i) => (
          <CircleDot key={`plus-${i}`} className="w-2 h-2 text-violet-500 fill-violet-500" />
        ))}
        {[...Array(minus)].map((_, i) => (
          <CircleDot key={`minus-${i}`} className="w-2 h-2 text-amber-500 fill-amber-500" />
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

  const renderGameSummary = (className: string, fontSize: string) => (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="text-center mb-2">
        <h1 className={`${fontSize} font-bold mb-1`}>Game Summary</h1>
        <div className={`${fontSize} font-semibold text-violet-600`}>
          {winner === "player" ? `${playerName} Won!` : `${opponentName} Won!`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="space-y-0.5">
          <div className={`font-semibold text-violet-700 ${fontSize}`}>{playerName}</div>
          <div className={`${fontSize} text-gray-600`}>
            Time: {playerMinutes}m {playerSeconds}s
          </div>
          <div className={`${fontSize}`}>Secret: {playerNumber}</div>
        </div>
        <div className="space-y-0.5">
          <div className={`font-semibold text-teal-700 ${fontSize}`}>{opponentName}</div>
          <div className={`${fontSize} text-gray-600`}>
            Time: {opponentMinutes}m {opponentSeconds}s
          </div>
          <div className={`${fontSize}`}>Secret: {opponentNumber}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto">
        <div className="space-y-1">
          <div className={`font-medium mb-1 ${fontSize}`}>Your Guesses:</div>
          {history.filter(h => h.player === "player").map((guess, index) => (
            <div key={index} className={`flex items-center justify-between bg-white p-1 rounded-lg ${fontSize}`}>
              <span>{guess.guess}</span>
              {renderResult(guess.result)}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className={`font-medium mb-1 ${fontSize}`}>{opponentName}'s Guesses:</div>
          {history.filter(h => h.player === "computer").map((guess, index) => (
            <div key={index} className={`flex items-center justify-between bg-white p-1 rounded-lg ${fontSize}`}>
              <span>{guess.guess}</span>
              {renderResult(guess.result)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className={`font-medium ${fontSize}`}>Game Duration</div>
            <div className={fontSize}>
              {playerName}: {playerMinutes}m {playerSeconds}s
              <br />
              {opponentName}: {opponentMinutes}m {opponentSeconds}s
            </div>
          </div>
          <div>
            <div className={`font-medium ${fontSize}`}>Winning Turn</div>
            <div className={fontSize}>Turn {winningTurn}</div>
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
            <div ref={portraitRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-4 rounded-lg shadow-lg w-full aspect-[9/16]">
              {renderGameSummary("text-sm", "text-base")}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div ref={tallRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-3 rounded-lg shadow-lg w-full aspect-[3/4]">
              {renderGameSummary("text-xs", "text-sm")}
            </div>
          </CarouselItem>
          <CarouselItem>
            <div ref={squareRef} className="relative overflow-hidden bg-gray-50 text-gray-900 p-3 rounded-lg shadow-lg w-full aspect-square">
              {renderGameSummary("text-xs", "text-xs")}
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex gap-2 flex-wrap justify-center">
        <Button onClick={() => downloadImage(portraitRef, '9-16')} variant="outline" size="sm">
          <Square className="w-4 h-4 mr-2" />
          Download 9:16
        </Button>
        <Button onClick={() => downloadImage(tallRef, '3-4')} variant="outline" size="sm">
          <Square className="w-4 h-4 mr-2" />
          Download 3:4
        </Button>
        <Button onClick={() => downloadImage(squareRef, '1-1')} variant="outline" size="sm">
          <Square className="w-4 h-4 mr-2" />
          Download 1:1
        </Button>
        <Button onClick={() => shareImage(portraitRef)} size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        {roomId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={copyRoomId} variant="outline" size="sm">
                {hasCopied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy Room ID
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy room ID to share with friends</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};