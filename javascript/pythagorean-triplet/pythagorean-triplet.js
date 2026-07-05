//
// This is only a SKELETON file for the 'Pythagorean Triplet' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class Triplet {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  toArray() {
    return [this.a, this.b, this.c];
  }
}

export function triplets({ minFactor = 1, maxFactor, sum }) {
  const result = [];
  const maxA = Math.floor(sum / 3);
  const startA = Math.max(1, minFactor);

  for (let a = startA; a < maxA; a++) {
    const numerator = sum * sum - 2 * sum * a;
    const denominator = 2 * (sum - a);

    if (numerator % denominator === 0) {
      const b = numerator / denominator;
      const c = sum - a - b;

      if (b > a) {
        const withinMaxFactor = !maxFactor || (b <= maxFactor && c <= maxFactor);
        if (withinMaxFactor) {
          result.push(new Triplet(a, b, c));
        }
      }
    }
  }
  return result;
}
