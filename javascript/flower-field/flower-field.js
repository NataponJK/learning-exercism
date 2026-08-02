//
// This is only a SKELETON file for the 'Flower Field' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const annotate = (board) => {
  if (board.length === 0 || board[0].length === 0) return board;

  const height = board.length;
  const width = board[0].length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
     [0, -1],           [0, 1],
     [1, -1],  [1, 0],  [1, 1],
  ]
  return board.map((row, r) => {
    return row.split('').map((char, c) => {
      if (char === '*') return '*';
      let flowerCount = 0;
      
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        
        if (nr >= 0 && nr < height && nc >= 0 && nc < width) {
          if (board[nr][nc] === '*') {
            flowerCount++;
          }
        }
      }
      return flowerCount > 0 ? flowerCount.toString() : ' ';
    }).join('');
  });
};
