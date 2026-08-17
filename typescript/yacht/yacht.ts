//
// This is only a SKELETON file for the 'Yacht' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const enum Category {
  ONES,
  TWOS,
  THREES,
  FOURS,
  FIVES,
  SIXES,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  LITTLE_STRAIGHT,
  BIG_STRAIGHT,
  CHOICE,
  YACHT,
}

export const score = (dice: number[], category: Category): number => {
  const counts: Record<number, number> = {};
  for (const die of dice) {
    counts[die] = (counts[die] || 0) + 1;
  }
  const countValues = Object.values(counts).sort((a, b) => a - b);

  const sumDice = dice.reduce((acc, val) => acc + val, 0);
  const sortedDice = [...dice].sort((a, b) => a - b);

  switch (category) {
    case Category.YACHT:  return countValues.length === 1 && countValues[0] === 5 ? 50 : 0;
    case Category.ONES:   return dice.filter(d => d === 1).length * 1;
    case Category.TWOS:   return dice.filter(d => d === 2).length * 2;
    case Category.THREES: return dice.filter(d => d === 3).length * 3;
    case Category.FOURS:  return dice.filter(d => d === 4).length * 4;
    case Category.FIVES:  return dice.filter(d => d === 5).length * 5;
    case Category.SIXES:  return dice.filter(d => d === 6).length * 6;
    case Category.FULL_HOUSE: return countValues.length === 2 && countValues[0] === 2 && countValues[1] === 3 ? sumDice : 0;
    case Category.FOUR_OF_A_KIND: {
      const fourOrMore = Object.keys(counts).find(key => counts[Number(key)] >= 4);
      return fourOrMore ? Number(fourOrMore) * 4 : 0;
    }
    case Category.LITTLE_STRAIGHT: return JSON.stringify(sortedDice) === JSON.stringify([1, 2, 3, 4, 5]) ? 30 : 0;
    case Category.BIG_STRAIGHT: return JSON.stringify(sortedDice) === JSON.stringify([2, 3, 4, 5, 6]) ? 30 : 0;
    case Category.CHOICE: return sumDice;
    default: return 0;
  }
}
