//
// This is only a SKELETON file for the 'Square root' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const squareRoot = (radicand) => {
  let root = 1;
  while (root * root !== radicand) root++;
  return root;
};
