export function score(x: number, y: number): number {
  const d = Math.hypot(x, y);
  return d <= 1 ? 10 : d <= 5 ? 5 : d <= 10 ? 1 : 0;
}
