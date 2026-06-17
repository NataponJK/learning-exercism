//
// This is only a SKELETON file for the 'Sum Of Multiples' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const sum = (factors, limit) => {
  return Array.from({ length: limit }, (_, i) => i)
              .filter(num => factors.some(factor => factor > 0 && num % factor === 0))
              .reduce((acc, current) => acc + current, 0);
};