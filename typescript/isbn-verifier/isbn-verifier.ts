export function isValid(isbn: string): boolean {
  const cleanIsbn: string = isbn.replace(/-/g, '');
  if (!/^\d{9}[\dX]$/.test(cleanIsbn)) {
    return false;
  }
  const total: number = [...cleanIsbn].reduce((sum: number, char: string, index: number): number => {
    const value: number = char === 'X' ? 10 : parseInt(char, 10);
    return sum + value * (10 - index);
  }, 0);
  return total % 11 === 0;
}
