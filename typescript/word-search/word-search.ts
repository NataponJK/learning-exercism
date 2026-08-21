type Coordinate = [number, number];

interface WordPosition {
  start: Coordinate;
  end :Coordinate;
}

interface SearchResult {
  [word: string]: WordPosition | undefined;
}

export class WordSearch {
  private grid: string[]

  constructor(grid: string[]) {
    this.grid = grid;
  }

  public find(words: string[]): SearchResult {
    const results: SearchResult = {};

    for (const word of words) {
      results[word] = this.findWord(word);
    }
    return results;
  }

  private findWord(word: string): WordPosition | undefined {
    const directions: Coordinate[] = [
      [-1, -1], [-1, 0], [-1, 1],
       [0, -1],           [0, 1],
       [1, -1],  [1, 0],  [1, 1],
    ];

    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        if (this.grid[r][c] !== word[0]) continue;

        for (const [dr, dc] of directions) {
          if (this.checkDirection(word, r, c, dr, dc)) {
            return {
              start: [r + 1, c + 1],
              end: [r + dr * (word.length - 1) + 1, c + dc * (word.length - 1) + 1]
            };
          }
        }
      }
    }
    return undefined;
  }
  private checkDirection(word: string, startRow: number, startCol: number, dr: number, dc: number): boolean {
    for (let i = 1; i < word.length; i++) {
      const r = startRow + dr * i;
      const c = startCol + dc * i;

      if (r < 0 || r >= this.grid.length || c < 0 || c >= this.grid[r].length) {
        return false;
      }

      if (this.grid[r][c] !== word[i]) {
        return false;
      }
    }
    return true;
  }
}
