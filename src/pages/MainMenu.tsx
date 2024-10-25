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

export const MainMenu = () => {
  const [playerName, setPlayerName] = useState("");
  const [timePerPlayer, setTimePerPlayer] = useState("5");
  const navigate = useNavigate();
  const { toast } = useToast();

  const createRoom = () => {
    if (!playerName) {
      toast({
        title: "Error",
        description: "Please enter your name",
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
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    navigate('/join', { state: { playerName } });
  };

  const playVsComputer = () => {
    if (!playerName) {
      toast({
        title: "Error",
        description: "Please enter your name",
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
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
          Number Guessing Game
        </h1>

        <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Your Name</label>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time per Player</label>
              <Select value={timePerPlayer} onValueChange={setTimePerPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 minutes</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={playVsComputer}
                className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
              >
                Play vs Computer
              </Button>
              <Button 
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
              >
                Create Multiplayer Room
              </Button>
              <Button 
                onClick={joinRoom}
                variant="outline"
                className="w-full"
              >
                Join Room
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};