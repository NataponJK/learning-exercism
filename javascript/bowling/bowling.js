//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  constructor() {
    this._rolls = [];
  }

  roll(pins) {
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    if (this.isGameOver()) {
      throw new Error('Cannot roll after game is over');
    }

    this._rolls.push(pins);
    this.validateCurrentRolls();
  }

  score() {
    if (!this.isGameOver()) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    let totalScore = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        totalScore += 10 + this._rolls[rollIndex + 1] + this._rolls[rollIndex + 2];
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        totalScore += 10 + this._rolls[rollIndex + 2];
        rollIndex += 2;
      } else {
        totalScore += this._rolls[rollIndex] + this._rolls[rollIndex + 1];
        rollIndex += 2;
      }
    }

    return totalScore;
  }

  isStrike(rollIndex) {
    return this._rolls[rollIndex] === 10;
  }
  isSpare(rollIndex) {
    return this._rolls[rollIndex] + this._rolls[rollIndex + 1] === 10;
  }
  
  isGameOver() {
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (rollIndex >= this._rolls.length) return false;

      if (frame === 9) {
        if (this.isStrike(rollIndex)) {
          return this._rolls.length === rollIndex + 3;
        }
        if (this._rolls[rollIndex] + this._rolls[rollIndex + 1] === 10) {
          return this._rolls.length === rollIndex + 3;
        }
        return this._rolls.length === rollIndex + 2;
      }

      if (this.isStrike(rollIndex)) {
        rollIndex += 1;
      } else {
        rollIndex += 2;
      }
    }
    return true;
  }

  validateCurrentRolls() {
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (rollIndex >= this._rolls.length) break;

      if (frame === 9) {
        const r1 = this._rolls[rollIndex];
        const r2 = this._rolls[rollIndex + 1];
        const r3 = this._rolls[rollIndex + 2];

        if (r1 !== undefined && r2 !== undefined) {
          if (r1 < 10 && r1 + r2 > 10) {
            throw new Error('Pin count exceeds pins on the lane');
          }
        }
        if (r1 === 10 && r2 !== undefined && r3 !== undefined) {
          if (r2 < 10 && r2 + r3 > 10) {
            throw new Error('Pin count exceeds pins on the lane');
          }
        }
        break;
      }

      if (this.isStrike(rollIndex)) {
        rollIndex += 1;
      } else {
        const first = this._rolls[rollIndex];
        const second = this._rolls[rollIndex + 1];
        if (second !== undefined && first + second > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
        rollIndex += 2;
      }
    }
  }
}
