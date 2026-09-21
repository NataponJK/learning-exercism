//
// This is only a SKELETON file for the 'Dominoes' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const chain = (dominoes) => {
  if (dominoes.length === 0) return [];

  const backtrack = (remaining, currentChain) => {
    if (remaining.length === 0) {
      const firstDomino = currentChain[0];
      const lastDomino = currentChain[currentChain.length - 1];

      return firstDomino[0] === lastDomino[1] ? currentChain : null;
    }

    const lastPlaced = currentChain[currentChain.length - 1];
    const targetValue = lastPlaced[1];

    for (let i = 0; i < remaining.length; i++) {
      const nextDomino = remaining[i];
      let matchedDomino = null;

      if (nextDomino[0] === targetValue) {
        matchedDomino = nextDomino;
      } 
      else if (nextDomino[1] === targetValue) {
        matchedDomino = [nextDomino[1], nextDomino[0]];
      }
      if (matchedDomino) {
        const nextRemaining = remaining.filter((_, idx) => idx !== i);
        const result = backtrack(nextRemaining, [...currentChain, matchedDomino]);

        if (result) return result;
      }
    }
    return null
  };

  const first = dominoes[0];
  const remainingDominoes = dominoes.slice(1);

  return backtrack(remainingDominoes, [first]);
};
