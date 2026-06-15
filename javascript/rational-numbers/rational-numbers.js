//
// This is only a SKELETON file for the 'Rational Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const getGCD = (a, b) => (!b ? Math.abs(a) : getGCD(b, a % b));

export class Rational {
  constructor(numerator, denominator) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero.');
    }
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  add(other) {
    const num = this.numerator * other.denominator + other.numerator * this.denominator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  sub(other) {
    const num = this.numerator * other.denominator - other.numerator * this.denominator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  mul(other) {
    const num = this.numerator * other.numerator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  div(other) {
    const num = this.numerator * other.denominator;
    const den = this.denominator * other.numerator;
    return new Rational(num, den);
  }

  abs() {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(power) {
    if (power >= 0) {
      return new Rational(this.numerator ** power, this.denominator ** power);
    } else {
      const absPower = Math.abs(power);
      return new Rational(this.denominator ** absPower, this.numerator ** absPower);
    }
  }

  expreal(base) {
    const result =  base ** (this.numerator / this.denominator);
    return Math.abs(Math.round(result) - result) < 1e-9 ? Math.round(result) : result;
  }

  reduce() {
    const gcd = getGCD(this.numerator, this.denominator);
    this.numerator /= gcd;
    this.denominator /= gcd;

    if (this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }
    return this;
  }
}
