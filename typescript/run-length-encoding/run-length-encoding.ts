export function encode(string: string): string {
  return string.replace(/(.)\1+/g, (match, char) => match.length + char);
}

export function decode(string: string): string {
  return string.replace(/(\d+)(.)/g, (_, count, char) => char.repeat(Number(count)));
}
