export function steps(n: number, count: number = 0): number {
  if (n <= 0 || !Number.isInteger(n)) throw new Error('Only positive integers are allowed');
  if (n === 1) return count;
  return steps(n % 2 === 0 ? n / 2 : 3 * n + 1, count + 1);
}
