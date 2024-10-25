import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GameSetupProps {
  playerNumber: string;
  setPlayerNumber: (value: string) => void;
  onStartGame: () => void;
}

export const GameSetup = ({ playerNumber, setPlayerNumber, onStartGame }: GameSetupProps) => {
  return (
    <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg">
      <h2 className="text-xl mb-4 text-center text-gray-800">Enter your 4-digit number:</h2>
      <div className="flex gap-4 justify-center">
        <Input
          type="text"
          maxLength={4}
          value={playerNumber}
          onChange={(e) => setPlayerNumber(e.target.value)}
          className="bg-white border-gray-300 w-48"
          placeholder="Enter 4 unique digits"
        />
        <Button 
          onClick={onStartGame}
          className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
        >
          Start Game
        </Button>
      </div>
    </Card>
  );
};