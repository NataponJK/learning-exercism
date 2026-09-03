//
// This is only a SKELETON file for the 'Micro-blog' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const truncate = (input) => {
  let result = '';
  let count = 0;
  for (const char of input) {
    if (count === 5) break;
    result += char;
    count++;
  }
  return result;
};
