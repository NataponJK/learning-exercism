export function ofSize(size: number): number[][] {
  const matrix: number[][] = Array.from({ length: size}, () => Array(size).fill(0));

  let top: number = 0;
  let bottom: number = size - 1;
  let left: number = 0;
  let right: number = size - 1;
  let currentNum: number = 1;

  while (currentNum <= size * size) {
    for (let i = left; i <= right; i++) {
      matrix[top][i] = currentNum++;
    }
    top ++;

    for (let i = top; i <= bottom; i++) {
      matrix[i][right] = currentNum++;
    }
    right--;

    for (let i = right; i >= left; i--) {
      matrix[bottom][i] = currentNum++;
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      matrix[i][left] = currentNum++;
    }
    left++
  }
  return matrix;
}
