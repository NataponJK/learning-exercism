//
// This is only a SKELETON file for the 'BookStore' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const BOOK_PRICE = 800; //cents
const DISCOUNTS = {
  0: 0,
  1: 1.00,
  2: 0.95,
  3: 0.90,
  4: 0.80,
  5: 0.75
}

export const cost = (books) => {
  const counts = Array(5).fill(0);
  books.forEach(book => counts[book - 1]++);
  counts.sort((a, b) => b - a);
  
  const memo = new Map();
  const getMinCost = (remainCounts) => {
    const current = remainCounts.filter(c => c > 0).sort((a, b) => b - a);
    if (current.length === 0) return 0;

    const key = current.join(',');
    if (memo.has(key)) return memo.get(key);
    
    let minCost = Infinity;
    for (let groupSize = 1; groupSize <= current.length; groupSize++) {
      const nextCounts = current.map((count, index) => index < groupSize ? count - 1 : count);
      const groupCost = groupSize * BOOK_PRICE * DISCOUNTS[groupSize];
      const total = groupCost + getMinCost(nextCounts);

      if (total < minCost) {
        minCost = total;
      }
    }
    memo.set(key, minCost);
    return minCost
  }
  return getMinCost(counts);
};
