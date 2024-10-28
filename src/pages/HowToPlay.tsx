import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";

export const HowToPlay = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
          How to Play
        </h1>
        
        <div className="space-y-4">
          <Card className="p-4 bg-white/80 backdrop-blur-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">Game Setup</h2>
            <p className="text-sm sm:text-base text-gray-600">
              1. Choose a secret 4-digit number with unique digits (e.g., 1234, 5678)
              <br />
              2. Your opponent will try to guess your number while you try to guess theirs
              <br />
              3. Take turns making guesses until someone wins
            </p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">Making Guesses</h2>
            <p className="text-sm sm:text-base text-gray-600">
              • Each guess must be a 4-digit number with unique digits
              <br />
              • After each guess, you'll receive feedback in the form of + and -
              <br />
              • + means correct digit in correct position
              <br />
              • - means correct digit in wrong position
            </p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">Feedback Colors</h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <div className="flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-violet-500 fill-violet-500" />
                <span>Purple circle: Correct digit in correct position (+)</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Orange circle: Correct digit in wrong position (-)</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">Example</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Secret number: 1234
              <br />
              Guess: 1543
              <br />
              Result: <CircleDot className="inline w-4 h-4 text-violet-500 fill-violet-500" /> <CircleDot className="inline w-4 h-4 text-amber-500 fill-amber-500" /> <CircleDot className="inline w-4 h-4 text-amber-500 fill-amber-500" />
              <br />
              (1 is in correct position, 3 and 4 are correct digits but wrong positions)
            </p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">Winning</h2>
            <p className="text-sm sm:text-base text-gray-600">
              • First player to correctly guess their opponent's number (4 purple circles) wins
              <br />
              • The game tracks turns and time taken by each player
              <br />
              • You can play against the computer or challenge a friend
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};