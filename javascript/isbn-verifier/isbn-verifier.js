//
// This is only a SKELETON file for the 'ISBN Verifier' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isValid = (isbn) => {
  const cleanIsbn = isbn.replace(/-/g, '');
  if (!/^\d{9}[\dX]$/.test(cleanIsbn)) {
    return false;
  }
  const total = [...cleanIsbn].reduce((sum, char, index) => {
    const value = char === 'X' ? 10 : parseInt(char, 10);
    return sum + value * (10 - index);
  }, 0);
  return total % 11 === 0;
};
