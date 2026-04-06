export class Matrix {
  private _matrix: number[][];

  constructor(matrixString: string) {
    this._matrix = matrixString.split(`\n`).map(row => row.split(` `).map(Number));
  }

  get rows(): number[][] {
    return this._matrix;
  }

  get columns(): number[][] {
    return this._matrix[0].map((_, i) => this._matrix.map(row => row[i]));
  }
}
