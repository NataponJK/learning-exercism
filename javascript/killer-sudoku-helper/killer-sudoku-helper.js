//
// This is only a SKELETON file for the 'Killer Sudoku Helper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const combinations = ({ sum, size, exclude}) => {
  const result = [];
  const excludedSet = new Set(exclude);

  function backtrack(start, currentCombo, currentSum) {
    if (currentCombo.length === size) {
      if (currentSum === sum) {
        result.push([...currentCombo]);
      }
      return
    };

    if (currentSum > sum) return;

    for (let i = start; i <= 9; i++) {
      if (excludedSet.has(i)) continue;

      currentCombo.push(i);
      backtrack(i + 1, currentCombo, currentSum + i);
      currentCombo.pop();
    }
  }

  backtrack(1, [], 0);
  return result;
};
