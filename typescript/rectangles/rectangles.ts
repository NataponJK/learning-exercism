interface Corner {
  r: number;
  c: number;
}

export function count(diagram: string[]): number {
  if (diagram.length === 0 || diagram[0].length === 0) {
    return 0;
  }
  const rows: number = diagram.length;
  const cols: number = diagram[0].length;
  let rectangleCount: number = 0;
  const corners: Corner[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (diagram[r][c] === '+') {
        corners.push({ r, c });
      }
    }
  }
  for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      const topleft: Corner = corners[i];
      const bottomright: Corner = corners[j];
      if (topleft.r < bottomright.r && topleft.c < bottomright.c) {
        if (diagram[topleft.r][bottomright.c] === '+' && diagram[bottomright.r][topleft.c] === '+') {
          if (checkHorizontal(diagram, topleft.r, topleft.c, bottomright.c) &&
              checkHorizontal(diagram, bottomright.r, topleft.c, bottomright.c) &&
              checkVertical(diagram, topleft.c, topleft.r, bottomright.r) &&
              checkVertical(diagram, bottomright.c, topleft.r, bottomright.r)
            ) {
            rectangleCount++;
          }
        }
      }
    }
  }
  return rectangleCount;
}

function checkHorizontal(diagram: string[], r: number, c1: number, c2: number): boolean {
  for (let c = c1 + 1; c < c2; c++) {
    const char: string = diagram[r][c];
    if (char !== '-' && char !== '+') {
      return false;
    }
  }
  return true;
}

function checkVertical(diagram: string[], c: number, r1: number, r2: number): boolean {
  for (let r = r1 + 1; r < r2; r++) {
    const char: string = diagram[r][c];
    if (char !== '|' && char !== '+') {
      return false;
    }
  }
  return true;
}