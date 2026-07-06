//
// This is only a SKELETON file for the 'Largest Series Product' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const largestProduct = (digits, span) => {
  if (span < 0) {
    throw new Error('span must not be negative');
  }
  if (/\D/.test(digits)) {
    throw new Error('digits input must only contain digits');
  }
  if (span > digits.length) {
    throw new Error('span must not exceed string length');
  }
  if (span === 0) {
    return 1;
  }
  let maxProduct = 0;
  for (let i = 0; i <= digits.length - span; i++) {
    const window = digits.slice(i, i + span);
    const product = [...window].reduce((acc, num) => acc * Number(num), 1);
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  return maxProduct;
};
