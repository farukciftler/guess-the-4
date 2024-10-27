export const generateSecretNumber = (): string => {
  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  let result = "";
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    result += digits[randomIndex];
    digits.splice(randomIndex, 1);
  }
  
  return result;
};

export const evaluateGuess = (secret: string, guess: string): string => {
  // Validate inputs
  if (!secret || !guess || secret.length !== 4 || guess.length !== 4) {
    return "0+0-";
  }

  let plus = 0;
  let minus = 0;
  
  // Count exact matches (plus)
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      plus++;
    }
  }
  
  // Count number matches in wrong position (minus)
  const secretDigits = secret.split("");
  const guessDigits = guess.split("");
  
  for (let i = 0; i < 4; i++) {
    const index = secretDigits.indexOf(guessDigits[i]);
    if (index !== -1 && guess[i] !== secret[i]) {
      minus++;
    }
  }
  
  return `${plus}+${minus}-`;
};