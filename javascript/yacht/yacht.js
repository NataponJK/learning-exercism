//
// This is only a SKELETON file for the 'Yacht' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const score = (dice, category) => {
  const counts = Array(7).fill(0);
  dice.forEach(d => counts[d]++);

  const sumDice = () => dice.reduce((acc, curr) => acc + curr, 0);
  const countFace = (face) => dice.filter(d => d === face).length;
  const sortedString = [...dice].sort((a, b) => a - b).join('');

  switch(category) {
    case 'yacht' : return counts.includes(5) ? 50 : 0;
    case 'ones': return countFace(1) * 1;
    case 'twos': return countFace(2) * 2;
    case 'threes': return countFace(3) * 3;
    case 'fours': return countFace(4) * 4;
    case 'fives': return countFace(5) * 5;
    case 'sixes': return countFace(6) * 6;
    case 'full house' : return counts.includes(3) && counts.includes(2) ? sumDice() : 0;
    case 'four of a kind' :
      const fourOfAKindFace = counts.findIndex(c => c >= 4);
      return fourOfAKindFace !== -1 ? fourOfAKindFace * 4 : 0;
    case 'little straight' : return sortedString === '12345' ? 30 : 0;
    case 'big straight' : return sortedString === '23456' ? 30 : 0;
    case 'choice' : return sumDice();
    default : return 0;
  }
};
