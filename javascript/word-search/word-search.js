//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.numRows = grid.length;
    this.numCols = grid[0].length;
  }

  find(words) {
    const results = {};

    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
       [0, -1],           [0, 1],
       [1, -1],  [1, 0],  [1, 1],
    ];

    for (const word of words) {
      results[word] = this.findWord(word, directions);
    }
    return results;
  }

  findWord(word, directions) {
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        if (this.grid[r][c] !== word[0]) continue;

        for (const [dr, dc] of directions) {
          if (this.checkDirection(word, r, c, dr, dc)) {
            return {
              start: [r + 1, c + 1],
              end: [r + 1 + dr * (word.length - 1), c + 1 + dc * (word.length - 1)]
            };
          }
        }
      }
    }
    return undefined;
  }

  checkDirection(word, startRow, startCol, dr, dc) {
    for (let i = 1; i < word.length; i++) {
      const nextRow = startRow + dr * i;
      const nextCol = startCol + dc * i;

      if (nextRow < 0 || nextRow >= this.numRows || nextCol < 0 || nextCol >= this.numCols) {
        return false;
      }

      if (this.grid[nextRow][nextCol] !== word[i]) {
        return false;
      }
    }
    return true;
  }
}

export default WordSearch;
