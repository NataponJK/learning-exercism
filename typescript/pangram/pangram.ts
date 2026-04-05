export function isPangram(sentence: string): boolean {
  const letters = sentence.toLowerCase().match(/[a-z]/g);
  return new Set(letters).size === 26;
}
