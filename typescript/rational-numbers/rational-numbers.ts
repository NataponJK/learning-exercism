const getGCD = (a: number, b: number): number => (!b ? Math.abs(a) : getGCD(b, a % b));

export class Rational {
  public numerator: number;
  public denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero.');
    }
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  public add(other: Rational): Rational {
    const num = this.numerator * other.denominator + other.numerator * this.denominator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  public sub(other: Rational): Rational {
    const num = this.numerator * other.denominator - other.numerator * this.denominator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  public mul(other: Rational): Rational {
    const num = this.numerator * other.numerator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den);
  }

  public div(other: Rational): Rational {
    const num = this.numerator * other.denominator;
    const den = this.denominator * other.numerator;
    return new Rational(num, den);
  }

  public abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  public exprational(power: number): Rational {
    if (power >= 0) {
      return new Rational(this.numerator ** power, this.denominator ** power);
    } else {
      const absPower = Math.abs(power);
      return new Rational(this.denominator ** absPower, this.numerator ** absPower);
    }
  }

  public expreal(base: number): number {
    const result = base ** (this.numerator / this.denominator);
    return Math.abs(Math.round(result) - result) < 1e-9 ? Math.round(result) : result;
  }

  public reduce(): this {
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
