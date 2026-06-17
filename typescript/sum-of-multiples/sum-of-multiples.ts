export function sum(factors: number[], limit: number): number {
  return Array.from({ length: limit}, (_, i: number) => i)
              .filter((num: number) => factors.some((factor: number) => factor > 0 && num % factor === 0))
              .reduce((acc: number, current: number) => acc + current, 0);
}
