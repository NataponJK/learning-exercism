const RULES: readonly [number, string][] = [
  [3, `Pling`],
  [5, `Plang`],
  [7, `Plong`],
]

export function convert(number: number): string {
  const sound = RULES.filter(([factor]) => number % factor === 0)
                     .map(([_, word]) => word)
                     .join(``);
  return sound || String(number);
}
