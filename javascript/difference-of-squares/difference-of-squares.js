//
// This is only a SKELETON file for the 'Difference Of Squares' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Squares {
  constructor(n) {
    this.n = n;
  }

  get sumOfSquares() {
    return (this.n * (this.n + 1) * (2 * this.n + 1)) / 6;
  }

  get squareOfSum() {
    const sum = (this.n * (this.n + 1)) / 2;
    return sum ** 2;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}
