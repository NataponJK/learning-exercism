//
// This is only a SKELETON file for the 'Go Counting' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const EMPTY = ' ';
const BLACK = 'BLACK';
const WHITE = 'WHITE';
const NONE = 'NONE';

export class GoCounting {
  constructor(board) {
    this.board = board.map(row => [...row]);
    this.height = this.board.length;
    this.width = this.board[0]?.length || 0;
  }

  getTerritory(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return { error: 'Invalid coordinate'};
    }
    if (this.board[y][x] !== EMPTY) {
      return { owner: NONE, territory: [] };
    }

    const visited = new Set();
    const queue = [[x, y]];
    visited.add(`${x},${y}`);

    const territory = [];
    const stonesTouched = new Set();

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      territory.push([cx, cy]);

      const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];

      for (const [nx, ny] of neighbors) {
        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;

        const cell = this.board[ny][nx];
        if (cell === EMPTY) {
          const key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([nx, ny]);
          }
        } else {
          stonesTouched.add(cell);
        }
      }
    }

    let owner = NONE;
    if (stonesTouched.size === 1) {
      owner = stonesTouched.has('B') ? BLACK : WHITE;
    }

    territory.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return { owner, territory };
  }

  getTerritories() {
    const summary = { territoryBlack: [], territoryWhite: [], territoryNone: [] };
    const globalVisited = new Set();

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.board[y][x] === EMPTY && !globalVisited.has(`${x},${y}`)) {
          const { owner, territory } = this.getTerritory(x, y);

          for (const [tx, ty] of territory) {
            globalVisited.add(`${tx},${ty}`);
          }

          if (owner === BLACK) summary.territoryBlack.push(...territory);
          else if (owner === WHITE) summary.territoryWhite.push(...territory);
          else summary.territoryNone.push(...territory);
        }
      }
    }
    summary.territoryBlack.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    summary.territoryWhite.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    summary.territoryNone.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return summary;
  }
}
