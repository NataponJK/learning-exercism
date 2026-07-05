class Triplet {
  private a: number;
  private b: number;
  private c: number;

  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  public toArray(): [number, number, number] {
    return [this.a, this.b, this.c];
  }
}

interface TripletOptions {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({ minFactor =1, maxFactor, sum}: TripletOptions): Triplet[] {
  const result: Triplet[] = [];
  const maxA = Math.floor(sum / 3);
  const startA = Math.max(1, minFactor);

  for (let a = startA; a < maxA; a++){
    const numerator = sum * sum - 2 * sum * a;
    const denominator = 2 * (sum - a);
    if (numerator % denominator === 0){
      const b = numerator / denominator;
      const c = sum - a - b;

      if (b > a){
        const withinMaxFactor = !maxFactor || (b <= maxFactor && c <= maxFactor);
        if (withinMaxFactor) {
          result.push(new Triplet(a, b, c));
        }
      }
    }
  }
  return result;
}