export class InvalidInputError extends Error {
  constructor(message: string = 'Invalid Input') {
    super(message)
    this.name = 'InvalidInputError';
  }
}

export type Direction = 'north' | 'east' | 'south' | 'west'
export type Coordinates = [number, number]

const DIRECTIONS: Direction[] = ['north', 'east', 'south', 'west'];

export class Robot {
  private _bearing: Direction = 'north';
  private _coordinates: Coordinates = [0, 0];

  get bearing(): Direction {
    return this._bearing;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  place({ x, y, direction}:  { x: number; y: number; direction: string }) {
    if (!DIRECTIONS.includes(direction as Direction)) {
      throw new InvalidInputError('Invalid robot bearing');
    }
    this._coordinates = [x, y];
    this._bearing = direction as Direction;
  }

  evaluate(instructions: string): void {
    const commands = [...instructions];

    commands.forEach((command) => {
      if (command === 'R') {
        this.turnRight();
      } else if (command === 'L') {
        this.turnLeft();
      } else if (command === 'A') {
        this.advance();
      } else {
        throw new InvalidInputError('Invalid instruction');
      }
    })
  }

  private turnRight(): void {
    const currentIndex = DIRECTIONS.indexOf(this._bearing);
    this._bearing = DIRECTIONS[(currentIndex + 1) % 4];
  }

  private turnLeft(): void {
    const currentIndex = DIRECTIONS.indexOf(this._bearing);
    this._bearing = DIRECTIONS[(currentIndex + 3) % 4];
  }

  private advance(): void {
    const [x, y] = this._coordinates;
    switch (this._bearing) {
      case 'north' : this._coordinates = [x, y + 1]; break;
      case 'east'  : this._coordinates = [x + 1, y]; break;
      case 'south' : this._coordinates = [x, y - 1]; break;
      case 'west'  : this._coordinates = [x - 1, y]; break;
    }
  }
}
