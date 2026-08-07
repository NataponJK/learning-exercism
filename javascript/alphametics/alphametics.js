//
// This is only a SKELETON file for the 'Alphametics' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const solve = (puzzle) => {
  const parts = puzzle.split(' == ');
  const leftWords = parts[0].split(' + ');
  const rightWord = parts[1];
  const allWords = [...leftWords, rightWord];

  const leadingLetters = new Set(allWords.map(word => word[0]));

  const letterWeights = {};

  leftWords.forEach(word => {
    for (let i = 0; i < word.length; i++) {
      const char = word[word.length - 1 - i];
      letterWeights[char] = (letterWeights[char] || 0) + Math.pow(10, i);
    }
  });

  for (let i = 0; i < rightWord.length; i++) {
    const char = rightWord[rightWord.length - 1 - i];
    letterWeights[char] = (letterWeights[char] || 0) - Math.pow(10, i);
  }

  const letters = Object.keys(letterWeights);
  const letterCount = letters.length;
  const digitsUsed = new Array(10).fill(false);
  const currentMapping = {};

  const backtrack = (index, currentSum) => {
    if (index === letterCount) {
      return currentSum === 0 ? { ...currentMapping } : null;
    }

    const char = letters[index];
    const weight = letterWeights[char];

    for (let digit = 0; digit <= 9; digit++) {
      if (digitsUsed[digit]) continue;
      if (digit === 0 && leadingLetters.has(char)) continue;

      digitsUsed[digit] = true;
      currentMapping[char] = digit;

      const result = backtrack(index + 1, currentSum + weight * digit);
      if (result) return result;

      digitsUsed[digit] = false;
      delete currentMapping[char];
    }
    return null;
  };
  return backtrack(0, 0);
};
