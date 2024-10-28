// Generate all possible 4-digit numbers with unique digits
const generateAllPossibleNumbers = () => {
  const numbers: string[] = [];
  for (let i = 0; i < 10000; i++) {
    const num = i.toString().padStart(4, '0');
    if (new Set(num).size === 4) {
      numbers.push(num);
    }
  }
  return numbers;
};

// Filter possible numbers based on the feedback
const filterPossibleNumbers = (
  possibleNumbers: string[],
  guess: string,
  feedback: string
) => {
  const [plus, minus] = feedback.split("+")[0] === "" 
    ? [0, parseInt(feedback)] 
    : feedback.split("+").map(n => parseInt(n));
  
  return possibleNumbers.filter(num => {
    let exactMatches = 0;
    let partialMatches = 0;
    const usedIndices = new Set<number>();
    const usedGuessIndices = new Set<number>();
    
    // Count exact matches
    for (let i = 0; i < 4; i++) {
      if (num[i] === guess[i]) {
        exactMatches++;
        usedIndices.add(i);
        usedGuessIndices.add(i);
      }
    }
    
    // Count partial matches
    for (let i = 0; i < 4; i++) {
      if (!usedIndices.has(i)) {
        for (let j = 0; j < 4; j++) {
          if (!usedGuessIndices.has(j) && num[i] === guess[j]) {
            partialMatches++;
            usedGuessIndices.add(j);
            break;
          }
        }
      }
    }
    
    return exactMatches === plus && partialMatches === minus;
  });
};

export const makeComputerGuess = (previousGuesses: Array<{guess: string, result: string}>) => {
  let possibleNumbers = generateAllPossibleNumbers();
  
  // Filter based on previous guesses and their feedback
  for (const {guess, result} of previousGuesses) {
    const newPossibleNumbers = filterPossibleNumbers(possibleNumbers, guess, result.split("-")[0]);
    // If filtering results in no possible numbers, keep the previous set
    if (newPossibleNumbers.length > 0) {
      possibleNumbers = newPossibleNumbers;
    }
  }
  
  // If no possibilities found, generate a new random number
  if (possibleNumbers.length === 0) {
    possibleNumbers = generateAllPossibleNumbers();
  }
  
  // Return a random number from remaining possibilities
  return possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
};
