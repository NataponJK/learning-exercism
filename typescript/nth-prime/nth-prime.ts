export function nth(n: number): number {
  if (n < 1) {
    throw new Error('Prime is not possible');
  }
  const primes: number[] = [2];
  let candidate = 3;
  while (primes.length < n) {
    if (isPrime(candidate, primes)) {
      primes.push(candidate);
    }
    candidate += 2;
  }
  return primes[n - 1];
}

function isPrime(num: number, primes: number[]): boolean {
  const limit = Math.sqrt(num);
  for (const p of primes) {
    if (p > limit) break;
    if (num % p === 0) return false;
  }
  return true;
}
