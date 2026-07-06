export const largestProduct = (digits: string, span: number): number => {
  if (span < 0) {
    throw new Error('Span must not be negative');
  }
  if (/\D/.test(digits)) {
    throw new Error('Digits input must only contain digits');
  }
  if (span > digits.length) {
    throw new Error('Span must not exceed string length');
  }
  if (span === 0) { return 1; }
  let maxProduct = 0;
  for (let i = 0; i <= digits.length - span; i++) {
    const window = digits.slice(i, i + span);
    const product = [...window].reduce((acc: number, num: string) => acc * Number(num), 1);
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  return maxProduct;
}
