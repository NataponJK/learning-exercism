//
// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const valid = (string) => {
  const cleanString = string.replace(/\s+/g, '');
  if (cleanString.length <= 1 || /\D/.test(cleanString)) { return false; }
  return [...cleanString].reverse()
                         .map(Number)
                         .reduce((sum, digit, index) => {
                          if (index % 2 === 1) {
                            const doubled = digit * 2;
                            return sum + (doubled > 9 ? doubled - 9 : doubled);
                          }
                          return sum + digit;
                         }, 0) % 10 === 0;
};
