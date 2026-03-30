//
// This is only a SKELETON file for the 'Resistor Color Trio' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

export class ResistorColorTrio {
  constructor(colors) {
    this.colors = colors;
  }

  get label() {
    if (this.colors.some(color => COLORS.indexOf(color) === -1)){
      throw new Error(`invalid color`);
    }
    const [a, b, c] = this.colors.map(color => COLORS.indexOf(color));
    let value = (a * 10 + b) * (10 ** c); //(firstDigit * 10 + secondDigit) * 10^multiplier

    let unit = `ohms`;

    if (value >= 1_000_000_000){
      value /= 1_000_000_000;
      unit = `gigaohms`;
    } else if (value >= 1_000_000){
      value /= 1_000_000;
      unit = `megaohms`;
    } else if (value >= 1_000){
      value /= 1_000;
      unit = `kiloohms`;
    }

    return `Resistor value: ${value} ${unit}`;
  }
}
