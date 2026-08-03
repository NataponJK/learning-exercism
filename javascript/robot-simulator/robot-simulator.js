//
// This is only a SKELETON file for the 'Robot Simulator' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

const DIRECTIONS = ['north', 'east', 'south', 'west'];

export class Robot {
  constructor() {
    this._bearing = 'north';
    this._coordinates = [0, 0];
  }
  get bearing() {
    return this._bearing;
  }

  get coordinates() {
    return this._coordinates;
  }

  place({ x, y, direction }) {
    if (!DIRECTIONS.includes(direction)) {
      throw new InvalidInputError('Invalid robot bearing');
    }
    this._coordinates = [x ,y];
    this._bearing = direction;
  }

  evaluate(instructions) {
    const commands = [...instructions];

    commands.forEach(command => {
      if (command === 'R') {
        this.turnRight();
      } else if (command === 'L') {
        this.turnLeft();
      } else if (command === 'A') {
        this.advance();
      } else {
        throw new InvalidInputError('Invalid instruction');
      }
    });
  }

  turnRight() {
    const currentIndex = DIRECTIONS.indexOf(this._bearing);
    this._bearing = DIRECTIONS[(currentIndex + 1) % 4];
  }

  turnLeft() {
    const currentIndex = DIRECTIONS.indexOf(this._bearing);
    this._bearing = DIRECTIONS[(currentIndex + 3) % 4];
  }

  advance() {
    const [x, y] = this._coordinates;
    switch (this._bearing) {
      case 'north' : this._coordinates = [x, y + 1]; break;
      case 'east'  : this._coordinates = [x + 1, y]; break;
      case 'south' : this._coordinates = [x, y - 1]; break;
      case 'west'  : this._coordinates = [x - 1, y]; break;
    }
  }
}
