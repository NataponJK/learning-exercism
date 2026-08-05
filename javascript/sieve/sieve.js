//
// This is only a SKELETON file for the 'Sieve' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const primes = (limit) => {
  const isPrime = new Array(limit + 1).fill(true);
  const result = [];

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      result.push(i);

      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return result;
};
