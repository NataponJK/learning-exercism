export function classify(number: number): string {
  if (number <= 0) {
    throw new Error(`Classification is only possible for natural numbers.`);
  }
  let aliquotSum = 0;
  for (let i: number = 1; i <= number / 2; i++){
    if (number % i === 0)
      aliquotSum += i;
  }
  if (aliquotSum === number) return `perfect`;
  if (aliquotSum > number) return `abundant`;
  return `deficient`;
}
