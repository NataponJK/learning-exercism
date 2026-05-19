export class DiffieHellman {
  private primeP: number;
  private primeG: number;

  constructor(p: number, g: number) {
    if (!isPrime(p) || !isPrime(g) || p < 2 || g < 2) {
      throw new Error();
    }
    this.primeP = p;
    this.primeG = g;
  }

  public getPublicKey(privateKey: number): number {
    if (privateKey <= 1 || privateKey >= this.primeP) {
      throw new Error();
    }
    return (this.primeG ** privateKey) % this.primeP;
  }

  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    if (myPrivateKey <= 1 || myPrivateKey >= this.primeP) {
      throw new Error();
    }
    return (theirPublicKey ** myPrivateKey) % this.primeP;
  }
}

export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};