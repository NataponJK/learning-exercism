export class Robot {
  private static _namePool: Map<string,boolean> = new Map();
  private _name: string;
  constructor() {
    this._name = this._newName();
  }
  private _randomName(): string{
    const letters = [...`ABCDEFGHIJKLMNOPQRSTUVWXYZ`];
    const numbers = [...`0123456789`];
    return letters[~~(Math.random() * 26)] +
           letters[~~(Math.random() * 26)] +
           numbers[~~(Math.random() * 10)] +
           numbers[~~(Math.random() * 10)] +
           numbers[~~(Math.random() * 10)];
  }

  private _newName(): string {
    let name: string;
    do {
      name = this._randomName();
    } while ( Robot._namePool.has(name) );
    Robot._namePool.set(name, true);
    return name
  }
  
  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    this._name = this._newName();
  }

  public static releaseNames(): void {
    Robot._namePool = new Map();
  }
}
