//
// This is only a SKELETON file for the 'Connect' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const DIRECTIONS = [
  [-1, 0],  // North-West
  [-1, 1],  // North-East
  [0, -1],  // West
  [0, 1],   // East
  [1, -1],  // South-West
  [1, 0]    // South-East
];

export class Board {
  constructor(board) {
    this.grid = board.map(row => row.trim().split(/\s+/));
    this.rows = this.grid.length;
    this.cols = this.rows > 0 ? this.grid[0].length : 0;
  }

  winner() {
    if (this.checkWin('O')) return 'O';
    if (this.checkWin('X')) return 'X';
    return '';
  }

  checkWin(player) {
    const queue = [];
    const visited = new Set();

    if (player === 'O') {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[0][c] === 'O') {
          queue.push([0, c]);
          visited.add(`0,${c}`);
        }
      }
    } else {
      for (let r = 0; r < this.rows; r++) {
        if (this.grid[r][0] === 'X') {
          queue.push([r, 0]);
          visited.add(`${r},0`);
        }
      }
    }
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      if (player === 'O' && r === this.rows - 1) return true;
      if (player === 'X' && c === this.cols - 1) return true;

      for (const [dr, dc] of DIRECTIONS) {
        const nr = r + dr;
        const nc = c + dc;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 && nr < this.rows
          && nc >= 0 && nc < this.cols
          && this.grid[nr][nc] === player
          && !visited.has(key)
        ) {
          visited.add(key);
          queue.push([nr, nc]);
        }
      }
    }
    return false;
  }
}
