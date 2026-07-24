export const findFewestCoins = (coins: number[], target: number): number[] => {
  if (target < 0) {
    throw new Error(`target can't be negative`);
  }
  if (target === 0) {
    return [];
  }
  const minCoins: number[] = new Array(target + 1).fill(Infinity);
  const coinUsed: number[] = new Array(target + 1).fill(-1);
  minCoins[0] = 0;
  for (let currentAmount = 1; currentAmount <= target; currentAmount++) {
      for (const coin of coins) {
        if (coin <= currentAmount) {
          const remainderAmount = currentAmount - coin;
          
          if (minCoins[remainderAmount] + 1 < minCoins[currentAmount]) {
            minCoins[currentAmount] = minCoins[remainderAmount] + 1;
            coinUsed[currentAmount] = coin;
          }
        }
      }
    }
    if (minCoins[target] === Infinity) {
    throw new Error("can't make target with given coins");
  }
    const result: number[] = [];
    let current = target;
    while (current > 0) {
      const coin = coinUsed[current];
      result.push(coin);
      current -= coin;
    }
    return result.sort((a, b) => a - b);
}
