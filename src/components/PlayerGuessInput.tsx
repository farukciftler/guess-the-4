import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface PlayerGuessInputProps {
  onGuess: (guess: string) => void;
}

const PlayerGuessInput = ({ onGuess }: PlayerGuessInputProps) => {
  const [guess, setGuess] = useState("");
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guess[0] === "0") {
      toast({
        title: t("invalidNumber"),
        description: t("invalidFirstDigit"),
        variant: "destructive",
      });
      return;
    }

    if (guess.length !== 4 || new Set(guess).size !== 4 || !/^\d+$/.test(guess)) {
      toast({
        title: t("invalidNumber"),
        description: t("enterValidNumber"),
        variant: "destructive",
      });
      return;
    }
    
    onGuess(guess);
    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4 w-full max-w-lg mx-auto">
      <Input
        type="text"
        maxLength={4}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="bg-white border-gray-300 flex-1"
        placeholder={t("enterValidNumber")}
      />
      <Button 
        type="submit"
        className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600 whitespace-nowrap"
      >
        Submit Guess
      </Button>
    </form>
  );
};

export default PlayerGuessInput;