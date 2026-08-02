export function annotate(field: string[]): string[] {
  if (field.length === 0 || field[0].length === 0) return field;
  
  const heigth: number = field.length;
  const width: number = field[0].length;

  const directions: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
     [0, -1],           [0, 1],
     [1, -1],  [1, 0],  [1, 1]
  ];

  return field.map((row: string, r: number) => {
    return row.split('').map((char: string, c: number) => {
      if (char === '*') return '*';

      let flowerCount: number = 0;
      for (const [dr, dc] of directions) {
        const nr: number = r + dr;
        const nc: number = c + dc;

        if (nr >= 0 && nr < heigth && nc >= 0 && nc < width) {
          if (field[nr][nc] === '*') {
            flowerCount++;
          }
        }
      }
      return flowerCount > 0 ? flowerCount.toString() : ' ';
    }).join('');
  })
}
