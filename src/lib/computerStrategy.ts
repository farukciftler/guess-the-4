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
  const [plus, minus] = feedback.split("+").map(n => parseInt(n));
  
  return possibleNumbers.filter(num => {
    let exactMatches = 0;
    let partialMatches = 0;
    const usedIndices = new Set<number>();
    
    // Count exact matches
    for (let i = 0; i < 4; i++) {
      if (num[i] === guess[i]) {
        exactMatches++;
        usedIndices.add(i);
      }
    }
    
    // Count partial matches
    for (let i = 0; i < 4; i++) {
      if (!usedIndices.has(i)) {
        const index = num.indexOf(guess[i]);
        if (index !== -1 && !usedIndices.has(index) && num[i] !== guess[i]) {
          partialMatches++;
          usedIndices.add(index);
        }
      }
    }
    
    return exactMatches === plus && partialMatches === minus;
  });
};

export const makeComputerGuess = (previousGuesses: Array<{guess: string, result: string}>) => {
  let possibleNumbers = generateAllPossibleNumbers();
  
  // Filter based on previous guesses and their feedback
  previousGuesses.forEach(({guess, result}) => {
    possibleNumbers = filterPossibleNumbers(possibleNumbers, guess, result.split("-")[0]);
  });
  
  // Return a random number from remaining possibilities
  return possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
};