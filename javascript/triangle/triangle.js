//
// This is only a SKELETON file for the 'Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Triangle {
  constructor(...sides) {
    this.sides = sides.sort((a, b) => a - b);
    const [a, b, c] = this.sides;
    this.isValid = a > 0 && a + b >= c;
  }

  get isEquilateral() {
    if (!this.isValid) return false;
    const [a, b, c] = this.sides;
    return a === b && b === c;
  }

  get isIsosceles() {
    if (!this.isValid) return false;
    const [a, b, c] = this.sides;
    return a === b || b === c;
  }

  get isScalene() {
    if (!this.isValid) return false;
    return !this.isIsosceles;
  }
}
