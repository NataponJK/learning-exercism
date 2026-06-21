//
// This is only a SKELETON file for the 'Complex Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class ComplexNumber {
  constructor(real, imag) {
    this._real = real;
    this._imag = imag;
  }

  get real() {
    return this._real;
  }

  get imag() {
    return this._imag
  }

  add(other) {
    return new ComplexNumber(
      this.real + other.real, 
      this.imag + other.imag
    );
  }

  sub(other) {
    return new ComplexNumber(
      this.real - other.real,
      this.imag - other.imag
    );
  }

  mul(other) {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    const realPart = this.real * o.real - this.imag * o.imag;
    const imagPart = this.imag * o.real + this.real * o.imag;
    return new ComplexNumber(
      realPart === 0 ? 0 : realPart, 
      imagPart === 0 ? 0 : imagPart
    );
  }

  div(other) {
    const o = other instanceof ComplexNumber ? other : new ComplexNumber(other, 0);
    const denominator = o.real ** 2 + o.imag ** 2;
    let realPart = (this.real * o.real + this.imag * o.imag) / denominator;
    let imagPart = (this.imag * o.real - this.real * o.imag) / denominator;
    return new ComplexNumber(
      realPart === 0 ? 0 : realPart, 
      imagPart === 0 ? 0 : imagPart
    );
  }

  get abs() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  get conj() {
    return new ComplexNumber(this.real, this.imag === 0 ? 0 : -this.imag);
  }

  get exp() {
    const expReal = Math.exp(this.real);
    return new ComplexNumber(
      expReal * Math.cos(this.imag),
      expReal * Math.sin(this.imag)
    );
  }
}
