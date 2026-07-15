export function valid(input: string): boolean {
  const cleanString: string = input.replace(/\s+/g, '');
  if (cleanString.length <= 1 || /\D/.test(cleanString)) { return false; }
  return Array.from(cleanString).reverse()
                                .map((char: string): number => Number(char))
                                .reduce((sum: number, digit: number, index: number): number => {
                                  if (index % 2 === 1) {
                                    const doubled: number = digit * 2;
                                    return sum + (doubled > 9 ? doubled - 9 : doubled);
                                  }
                                  return sum + digit;
                                }, 0) % 10 === 0;
}
