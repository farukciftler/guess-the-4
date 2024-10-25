import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const playerName = location.state?.playerName;

  const handleJoin = () => {
    if (!roomId) {
      toast({
        title: "Error",
        description: "Please enter a room ID",
        variant: "destructive",
      });
      return;
    }

    navigate(`/room/${roomId}`, {
      state: { 
        isHost: false, 
        playerName,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-900 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
          Join Room
        </h1>

        <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Room ID</label>
            <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleJoin}
              className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
            >
              Join Room
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
            >
              Back to Menu
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};