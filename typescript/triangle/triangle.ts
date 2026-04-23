export class Triangle {
  private sides: [number, number, number];
  private isValid: boolean;

  constructor(...sides: [number, number, number]) {
    this.sides = sides.sort((a, b) => a - b) as [number, number, number];
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
