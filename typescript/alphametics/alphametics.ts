type Alphametric = { [key: string]: number };

export function solve(puzzle: string): Alphametric | undefined {
  const words = puzzle.match(/[A-Z]+/g);
  if (!words) return undefined;

  const leadingLetters = new Set<string>();
  words.forEach(word => {
    if (word.length > 1) {
      leadingLetters.add(word[0]);
    }
  });

  const [leftSide, rightSide] = puzzle.split('==');
  const leftWords = leftSide.match(/[A-Z]+/g) || [];
  const rightWords = rightSide.match(/[A-Z]+/g) || [];
  
  const letterWeights: { [key: string]: number } = {};

  const addWeights = (wordList: string[], multiplier: number) => {
    for (const word of wordList) {
      let positionValue = 1;
      for (let i = word.length - 1; i >= 0; i--) {
        const letter = word[i];
        letterWeights[letter] = (letterWeights[letter] || 0) + positionValue * multiplier;
        positionValue *= 10;
      }
    }
  };

  addWeights(leftWords, 1);
  addWeights(rightWords, -1);

  const uniqueLetters = Object.keys(letterWeights);
  const letterCount = uniqueLetters.length;
  
  if (letterCount > 10) return undefined;

  const weights = uniqueLetters.map(letter => letterWeights[letter]);
  const isLeading = uniqueLetters.map(letter => leadingLetters.has(letter));

  const assignedValues = new Array<number>(letterCount).fill(-1);
  const usedDigits = new Array<boolean>(10).fill(false);

  function backtrack(index: number, currentSum: number): boolean {
    if (index === letterCount) {
      return currentSum === 0;
    }

    for (let digit = 0; digit <= 9; digit++) {
      if (usedDigits[digit]) continue;
      if (digit === 0 && isLeading[index]) continue;

      assignedValues[index] = digit;
      usedDigits[digit] = true;

      if (backtrack(index + 1, currentSum + digit * weights[index])) {
        return true;
      }
      usedDigits[digit] = false;
    }
    return false;
  }

  if (backtrack(0, 0)) {
    const solution: Alphametric = {};
    uniqueLetters.forEach((letter, i) => {
      solution[letter] = assignedValues[i];
    });
    return solution;
  }

  return undefined;
}
