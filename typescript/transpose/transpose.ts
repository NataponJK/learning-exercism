export function transpose(input: string[]): string[] {
  if (input.length === 0) return [];
  const maxLength: number = Math.max(...input.map(row => row.length));
  return Array.from({ length: maxLength}, (_, colIndex: number) => {
    return input.reduceRight((acc: string, row: string) => {
      const char: string | undefined = row[colIndex];
      if (char !== undefined) {
        return char + acc;
      }
      return (acc ? ' ' : '') + acc;
    }, '');
  });
}
