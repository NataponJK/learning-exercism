export function primes(limit: number): number[] {
  const isPrime: boolean[] = new Array(limit + 1).fill(true);
  const result: number[] = [];

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      result.push(i)

      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return result;
}
