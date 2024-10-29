export const calculateScore = (turn: number, timeInSeconds: number): number => {
  // Base score starts at 1000
  let score = 1000;
  
  // Deduct points for each turn (more turns = more deductions)
  score -= turn * 50;
  
  // Deduct points for time taken (1 point per second)
  score -= timeInSeconds;
  
  // Ensure minimum score of 0
  return Math.max(0, score);
};

export const getStoredScores = (): Score[] => {
  const scores = localStorage.getItem('numberGuessScores');
  return scores ? JSON.parse(scores) : [];
};

export const addScore = (score: Score) => {
  const scores = getStoredScores();
  scores.push(score);
  scores.sort((a, b) => b.score - a.score); // Sort by highest score
  localStorage.setItem('numberGuessScores', JSON.stringify(scores.slice(0, 10))); // Keep top 10
};