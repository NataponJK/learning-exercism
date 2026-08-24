export class Bowling {
  private rolls: number[] = [];

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    if (this.isGameOver()) {
      throw new Error('Cannot roll after game is over');
    }
    this.rolls.push(pins);
    this.validateCurrentFrame();
  }

  public score(): number {
    if (!this.isGameOver()) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    let totalScore = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        totalScore += 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        totalScore += 10 + this.rolls[rollIndex + 2];
        rollIndex += 2;
      } else {
        totalScore += this.rolls[rollIndex] + this.rolls[rollIndex + 1];
        rollIndex += 2;
      }
    }
    return totalScore;
  }

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private isGameOver(): boolean {
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (rollIndex >= this.rolls.length) {
        return false;
      }

      if (this.isStrike(rollIndex)) {
        if (frame === 9) {
          return this.rolls.length === rollIndex + 3;
        }
        rollIndex += 1;
      } else {
        if (rollIndex + 1 >= this.rolls.length) {
          return false;
        }
        if (this.isSpare(rollIndex)) {
          if (frame === 9) {
            return this.rolls.length === rollIndex + 3;
          }
        } else if (frame === 9) {
          return this.rolls.length === rollIndex + 2;
        }
        rollIndex += 2;
      }
    }
    return true;
  }

  private validateCurrentFrame(): void {
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (rollIndex >= this.rolls.length) return;

      if (this.isStrike(rollIndex)) {
        if (frame === 9) {
          const r1 = this.rolls[rollIndex + 1];
          const r2 = this.rolls[rollIndex + 2];
          if (r1 !== undefined && r1 < 10 && r2 !== undefined && r1 + r2 > 10) {
            throw new Error('Pin count exceeds pins on the lane');
          }
        }
        rollIndex += 1;
      } else {
        const firstRoll = this.rolls[rollIndex];
        const secondRoll = this.rolls[rollIndex + 1];

        if (secondRoll !== undefined && firstRoll + secondRoll > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
        rollIndex += 2;
      }
    }
  }
}
