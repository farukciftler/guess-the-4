import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlayerGuessInputProps {
  onGuess: (guess: string) => void;
}

const PlayerGuessInput = ({ onGuess }: PlayerGuessInputProps) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(guess);
    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        type="text"
        maxLength={4}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="bg-gray-700 border-gray-600"
        placeholder="Enter your guess"
      />
      <Button type="submit">Submit Guess</Button>
    </form>
  );
};

export default PlayerGuessInput;