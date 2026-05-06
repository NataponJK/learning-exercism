//
// This is only a SKELETON file for the 'Isogram' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isIsogram = (word) => {
  const letters = word.toLowerCase().match(/[a-z]/g) || [];
  return new Set(letters).size === letters.length;
};
