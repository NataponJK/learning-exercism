export function squareRoot(radicand: number): number {
  let root = 1;
  while (root * root !== radicand) root++;
  return root;
}
