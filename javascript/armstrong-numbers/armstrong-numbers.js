//
// This is only a SKELETON file for the 'Armstrong Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isArmstrongNumber = (number) => {
  const bigIntNumber = BigInt(number);
  const digits = String(number).split('');
  const power = BigInt(digits.length);

  const sum = digits.reduce((acc, digit) => {
    return acc + BigInt(digit) ** power;
  }, 0n);

  return sum === bigIntNumber;
};
