//
// This is only a SKELETON file for the 'Queen Attack' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class QueenAttack {
  constructor({ white =[7, 3], black = [0, 3] } = {}) {
    const [wRow, wCol] = white;
    const [bRow, bCol] = black;

    if (wRow < 0 || wRow > 7 || wCol < 0 || wCol > 7 ||
        bRow < 0 || bRow > 7 || bCol < 0 || bCol > 7) {
      throw new Error('Queen must be placed on the board');
    }

    if (wRow === bRow && wCol === bCol) {
      throw new Error('Queens cannot share the same space');
    }

    this._white = [wRow, wCol];
    this._black = [bRow, bCol];
  }

  get white() {
    return this._white;
  }

  get black() {
    return this._black;
  }

  toString() {
    const board = Array.from({ length: 8 }, () => Array(8).fill('_'));
    
    const [wRow, wCol] = this._white;
    const [bRow, bCol] = this._black;
    
    board[wRow][wCol] = 'W';
    board[bRow][bCol] = 'B';
    
    return board.map(row => row.join(' ')).join('\n');
  }

  get canAttack() {
    const [wRow, wCol] = this._white;
    const [bRow, bCol] = this._black;

    const sameRow = wRow === bRow;
    const sameColumn = wCol === bCol;
    const sameDiagonal = Math.abs(wRow - bRow) === Math.abs(wCol - bCol);

    return sameRow || sameColumn || sameDiagonal;
  }
}
