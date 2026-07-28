interface Point {
  row: number;
  column: number;
}

export function saddlePoints(matrix: number[][]): Point[] {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const rowMaxs = matrix.map(row => Math.max(...row)); 
  const colMins = matrix[0].map((_, colIndex) => 
    Math.min(...matrix.map(row => row[colIndex])));

  const points: Point[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === rowMaxs[rowIndex] && value === colMins[colIndex]) {
        points.push({ row: rowIndex + 1,
                      column: colIndex + 1,
        });
      }
    })
  })
  return points;
}
