export function isArmstrongNumber(number: number | bigint): boolean {
  const bigIntNumber = BigInt(number);
  const digits = String(number).split('');
  const power = BigInt(digits.length);

  const sum = digits.reduce((acc, digit) => {
    return acc + BigInt(digit) ** power;
  }, 0n);
  return sum === bigIntNumber;
}
