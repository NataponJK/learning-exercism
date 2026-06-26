//
// This is only a SKELETON file for the 'Two Bucket' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

//
// This is only a SKELETON file for the 'Two Bucket' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class TwoBucket {
  constructor(bucket1Size, bucket2Size, goal, startBucket) {
    this.b1Max = bucket1Size;
    this.b2Max = bucket2Size;
    this.goal = goal;
    this.startBucket = startBucket;

    if (this.goal > this.b1Max && this.goal > this.b2Max) {
      throw new Error('No solution possible');
    }
    if (this.goal % this.gcd(this.b1Max, this.b2Max) !== 0) {
      throw new Error('No solution possible');
    }
  }

  gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  solve() {
    const queue = [];
    const visited = new Set();

    let initialB1 = this.startBucket === 'one' ? this.b1Max : 0;
    let initialB2 = this.startBucket === 'two' ? this.b2Max : 0;
    
    queue.push([initialB1, initialB2, 1]);
    visited.add(`${initialB1},${initialB2}`);

    const forbiddenState = this.startBucket === 'one' 
      ? `0,${this.b2Max}` 
      : `${this.b1Max},0`;

    visited.add(forbiddenState);

    while (queue.length > 0) {
      const [b1, b2, moves] = queue.shift();

      if (b1 === this.goal) {
        return { moves, goalBucket: 'one', otherBucket: b2 };
      }
      if (b2 === this.goal) {
        return { moves, goalBucket: 'two', otherBucket: b1 };
      }

      const nextMoves = [
        [this.b1Max, b2],
        [b1, this.b2Max],
        [0, b2],
        [b1, 0],
        [
          b1 - Math.min(b1, this.b2Max - b2),
          b2 + Math.min(b1, this.b2Max - b2)
        ],
        [
          b1 + Math.min(b2, this.b1Max - b1),
          b2 - Math.min(b2, this.b1Max - b1)
        ]
      ];

      for (const [nextB1, nextB2] of nextMoves) {
        const stateKey = `${nextB1},${nextB2}`;

        if (!visited.has(stateKey)) {
          visited.add(stateKey);
          queue.push([nextB1, nextB2, moves + 1]);
        }
      }
    }

    throw new Error('No solution possible');
  }
}