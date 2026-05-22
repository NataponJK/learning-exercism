//
// This is only a SKELETON file for the 'Conway's Game of Life' exercise. It's been provided
// as a convenience to get you started writing code faster.
//

export class GameOfLife {
  constructor(matrix = []) {
    this.matrix = matrix;
  }

  tick() {
    if (this.matrix.length === 0) return;

    const rows = this.matrix.length;
    const cols = this.matrix[0].length;
    const nextGeneration = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const liveNeighbors = this.countLiveNeighbors(r, c, rows, cols);
        const cell = this.matrix[r][c];

        if (cell === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) {
          nextGeneration[r][c] = 1;
        } else if (cell === 0 && liveNeighbors === 3) {
          nextGeneration[r][c] = 1;
        }
      }
    }
    this.matrix = nextGeneration;
  }
  
  countLiveNeighbors(row, col, rows, cols) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    let count = 0;
    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        count += this.matrix[nr][nc];
      }
    }
    return count;
  }

  state() {
    return this.matrix;
  }
}
