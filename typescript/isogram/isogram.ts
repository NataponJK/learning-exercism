export function isIsogram(word: string): boolean {
  const letters = word.toLowerCase().match(/[a-z]/g) || [];
  return new Set(letters).size === letters.length;
}
