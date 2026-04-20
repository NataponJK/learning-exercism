export function count(phrase: string): Map<string, number> {
  const counts = new Map<string, number>();
  const words = phrase.toLowerCase().match(/\b[\w']+\b/g) || [];
  for (const word of words) {
    const currentCount = counts.get(word) || 0;
    counts.set(word, currentCount + 1);
  }
  return counts;
}
