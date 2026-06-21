export class ComplexNumber {
  private _real: number;
  private _imag: number;

  constructor(real: number, imag: number) {
    this._real = real;
    this._imag = imag;
  }

  public get real(): number {
    return this._real;
  }

  public get imag(): number {
    return this._imag
  }

  public add(other: ComplexNumber | number): ComplexNumber {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    return new ComplexNumber(
      this.real + o.real,
      this.imag + o.imag
    );
  }

  public sub(other: ComplexNumber | number): ComplexNumber {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    return new ComplexNumber(
      this.real - o.real,
      this.imag - o.imag
    );
  }

  public mul(other: ComplexNumber | number): ComplexNumber {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    const realPart = this.real * o.real - this.imag * o.imag;
    const imagPart = this.imag * o.real + this.real * o.imag;
    return new ComplexNumber(
      realPart === 0 ? 0 : realPart,
      imagPart === 0 ? 0 : imagPart
    );
  }

  public div(other: ComplexNumber | number): ComplexNumber {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    const denominator = o.real ** 2 + o.imag ** 2;
    const realPart = (this.real * o.real + this.imag * o.imag) / denominator;
    const imagPart = (this.imag * o.real - this.real * o.imag) / denominator;
    return new ComplexNumber(
      realPart === 0 ? 0 : realPart,
      imagPart === 0 ? 0 : imagPart
    );
  }

  public get abs(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, this.imag === 0 ? 0 : -this.imag);
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.real);
    const realPart = expReal * Math.cos(this.imag);
    const imagPart = expReal * Math.sin(this.imag);
    return new ComplexNumber(
      realPart === 0 ? 0 : realPart,
      imagPart === 0 ? 0 : imagPart
    );
  }
}
