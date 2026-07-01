/**
 * You can use the bigint type and BigInt global object to support numbers below
 * Number.MIN_SAFE_INTEGER and above NUMBER.MAX_SAFE_INTEGER.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 */

//
// This is only a SKELETON file for the 'Grains' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export const square = (num) => {
  if (num < 1 || num > 64) {
    throw new Error('square must be between 1 and 64');
  }
  return 2n ** BigInt(num - 1);
};

export const total = () => {
  return 2n ** 64n - 1n;
};
