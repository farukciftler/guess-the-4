import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CircleDot } from "lucide-react";

export const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-teal-500">
          How to Play
        </h1>

        <Card className="p-6 bg-white/80 border-gray-200 backdrop-blur-lg space-y-6">
          <div className="space-y-4">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Game Rules</h2>
              <p className="text-gray-700">
                Each player chooses a secret 4-digit number where all digits are different. Players take turns trying to guess each other's number.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Feedback System</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CircleDot className="w-5 h-5 text-violet-500 fill-violet-500" />
                  <span>Purple circle: Correct digit in correct position</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>Yellow circle: Correct digit in wrong position</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Example</h2>
              <div className="space-y-2">
                <p>Secret number: 1234</p>
                <p>Guess: 1543</p>
                <div className="flex items-center gap-2">
                  <span>Result:</span>
                  <CircleDot className="w-4 h-4 text-violet-500 fill-violet-500" />
                  <CircleDot className="w-4 h-4 text-violet-500 fill-violet-500" />
                  <CircleDot className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-sm text-gray-600">
                  (2 correct positions: 1 and 4, 1 correct digit in wrong position: 3)
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Winning</h2>
              <p className="text-gray-700">
                The first player to correctly guess their opponent's number wins the game!
              </p>
            </section>
          </div>

          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600"
          >
            Back to Menu
          </Button>
        </Card>
      </div>
    </div>
  );
};