type Item = {
  weight: number
  value: number
}

type Input = {
  maximumWeight: number;
  items: Item[];
};

export function maximumValue({ maximumWeight, items }: Input): number {
  const dp: number[] = new Array(maximumWeight + 1).fill(0);

  for (const item of items) {
    for (let w = maximumWeight; w >= item.weight; w--) {
      dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
    }
  }
  return dp[maximumWeight];
}
