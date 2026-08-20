type Position = readonly [number, number]

type QueenPositions = {
  white: Position
  black: Position
}
export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  constructor({ white,black }: Partial<QueenPositions> = {}) {
    this.white = white ?? [7, 3];
    this.black = black ?? [0, 3];

    const [wRow, wCol] = this.white;
    const [bRow, bCol] = this.black;

    if (wRow < 0 || wRow > 7 || wCol < 0 || wCol > 7 ||
        bRow < 0 || bRow > 7 || bCol < 0 || bCol > 7) {
      throw new Error('Queen must be placed on the board');
    }

    if (wRow === bRow && wCol === bCol) {
      throw new Error('Queens cannot share the same space');
    }
  }

  public toString(): string {
    const board = Array.from({ length: 8}, () => Array(8).fill('_'));

    const [wRow, wCol] = this.white;
    const [bRow, bCol] = this.black;
    
    board[wRow][wCol] = 'W';
    board[bRow][bCol] = 'B';

    return board.map(row => row.join(' ')).join('\n');
  }

  public get canAttack(): boolean {
    const [wRow, wCol] = this.white;
    const [bRow, bCol] = this.black;

    const sameRow = wRow === bRow;
    const sameCol = wCol === bCol;
    const sameDiagonal = Math.abs(wRow - bRow) === Math.abs(wCol - bCol);

    return sameRow || sameCol || sameDiagonal;
  }
}
