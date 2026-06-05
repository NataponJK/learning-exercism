//
// This is only a SKELETON file for the 'Prime Factors' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const primeFactors = (number) => {
  const factors = [];
  let divisors = 2;

  while (number > 1) {
    if (number % divisors === 0) {
      factors.push(divisors);
      number /= divisors;
    } else {
      divisors++;
    }
  }
  return factors;
};
