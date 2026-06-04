//
// This is only a SKELETON file for the 'Nth Prime' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const prime = (n) => {
  if (n < 1) {
    throw new Error('there is no zeroth prime');
  }
  const primes = [2];
  let candidate = 3;
  while (primes.length < n) {
    if (isPrime(candidate, primes)) {
      primes.push(candidate);
    }
    candidate += 2;
  }
  return primes[n - 1];
};

const isPrime = (num, primes) => {
  const limit = Math.sqrt(num);
  for (const p of primes) {
    if (p > limit) break;
    if (num % p === 0) return false;
  }
  return true;
}
