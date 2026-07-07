//
// This is only a SKELETON file for the 'Rectangles' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export function count(diagram) {
  if (diagram.length === 0 || diagram[0].length === 0) {
    return 0;
  }
  const rows = diagram.length;
  const cols = diagram[0].length;
  let rectangleCount = 0;

  const corners = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (diagram[r][c] === '+') {
        corners.push({ r, c });
      }
    }
  }
  for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      const topleft = corners[i];
      const bottomright = corners[j];

      if (topleft.r < bottomright.r && topleft.c < bottomright.c) {
        if (diagram[topleft.r][bottomright.c] === '+' && diagram[bottomright.r][topleft.c] === '+') {
          if (checkHorizontal(diagram, topleft.r, topleft.c, bottomright.c) &&
              checkHorizontal(diagram, bottomright.r, topleft.c, bottomright.c) &&
              checkVertical(diagram, topleft.c, topleft.r, bottomright.r) &&
              checkVertical(diagram, bottomright.c, topleft.r, bottomright.r)) 
              {
            rectangleCount++;
          }
        }
      }
    }
  }
  return rectangleCount;
}

function checkHorizontal(diagram, r, c1, c2) {
  for (let c = c1 + 1; c < c2; c++) {
    const char = diagram[r][c];
    if (char !== '-' && char !== '+') {
      return false;
    }
  }
  return true;
}

function checkVertical(diagram, c, r1, r2) {
  for (let r = r1 + 1; r < r2; r++) {
    const char = diagram[r][c];
    if (char !== '|' && char !== '+') {
      return false;
    }
  }
  return true;
}