export class GameOfLife {
  private matrix: number[][];

  constructor(matrix: number[][] = []) {
    this.matrix = matrix;
  }

  public tick(): void {
    if (this.matrix.length === 0) return;

    const rows: number = this.matrix.length;
    const cols: number = this.matrix[0].length;
    const nextGeneration: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

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

  private countLiveNeighbors(row: number, col: number, rows: number, cols: number): number {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          count += this.matrix[nr][nc];
        }
      }
    }
    return count;
  }

  public state(): number[][] {
    return this.matrix;
  }
}
