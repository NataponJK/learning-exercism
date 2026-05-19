//
// This is only a SKELETON file for the 'Diffie Hellman' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class DiffieHellman {
  constructor(p, g) {
    if (!isPrime(p) || !isPrime(g) || p < 2 || g < 2) throw new Error();
    this.primeP = p;
    this.primeG = g;
  }
  getPublicKey(privateKey) {
    if(privateKey <= 1 || privateKey >= this.primeP) throw new Error();
    return (this.primeG ** privateKey) % this.primeP;
  }
  getSecret(theirPublicKey, myPrivateKey) {
    if(myPrivateKey <= 1 || myPrivateKey >= this.primeP) throw new Error();
    return (theirPublicKey ** myPrivateKey) % this.primeP;
  }

  static getPrivateKey(prime) {
    return Math.floor(Math.random() * prime) + 2;
  }
}

export const isPrime = (number) =>{
  for (let i = number - 1; i > 1; i--)
    if(number % i === 0)
      return false;
  return true;
};