//
// This is only a SKELETON file for the 'Change' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Change {
  calculate(coinArray, target) {
    if (target < 0) {
      throw new Error('Negative totals are not allowed.');
    }
    
    if (target === 0) {
      return [];
    }
    
    const dp = new Array(target + 1).fill(null);
    dp[0] = [];

    for (let currentAmount = 1; currentAmount <= target; currentAmount++) {
      let optimalCombination = null;
      
      for (const coin of coinArray) {
        if (currentAmount >= coin) {
          const remainderCombination = dp[currentAmount - coin];
          if (remainderCombination !== null) {
            const potentialCombination = [...remainderCombination, coin];
            if (!optimalCombination || potentialCombination.length < optimalCombination.length) {
              optimalCombination = potentialCombination;
            }
          }
        }
      }
      dp[currentAmount] = optimalCombination;
    }
    if (dp[target] === null) {
      throw new Error(`The total ${target} cannot be represented in the given currency.`);
    }
    return dp[target].sort((a, b) => a - b);
  }
}