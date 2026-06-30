//
// This is only a SKELETON file for the 'Allergies' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const ALLERGENS = [
  'eggs',          // 1   (2^0) -> 00000001
  'peanuts',       // 2   (2^1) -> 00000010
  'shellfish',     // 4   (2^2) -> 00000100
  'strawberries',  // 8   (2^3) -> 00001000
  'tomatoes',      // 16  (2^4) -> 00010000
  'chocolate',     // 32  (2^5) -> 00100000
  'pollen',        // 64  (2^6) -> 01000000
  'cats'           // 128 (2^7) -> 10000000

]

export class Allergies {
  constructor(score) {
    this.score = score;
  }

  list() {
    return ALLERGENS.filter(allergen => this.allergicTo(allergen));
  }

  allergicTo(allergen) {
    const index = ALLERGENS.indexOf(allergen);
    if (index === -1) return false;
    return (this.score & (1 << index)) !== 0;
  }
}
