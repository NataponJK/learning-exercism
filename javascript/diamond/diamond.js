//
// This is only a SKELETON file for the 'Diamond' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const rows = (targetChar) => {
  const START_CODE = 'A'.charCodeAt(0);
  const maxIndex = targetChar.charCodeAt(0) - START_CODE;
  const halfDiamond = [];
  
  for (let i = 0; i <= maxIndex; i++) {
    const currentChar = String.fromCharCode(START_CODE + i);
    const outerSpaces = ' '.repeat(maxIndex - i);
    if (i === 0){
      halfDiamond.push(`${outerSpaces}A${outerSpaces}`);
    } else {
      const innerSpaces = ' '.repeat(2 * i - 1);
      halfDiamond.push(`${outerSpaces}${currentChar}${innerSpaces}${currentChar}${outerSpaces}`);
    }
  }
  const bottomHalf = [...halfDiamond].reverse().slice(1);
  return halfDiamond.concat(bottomHalf);
};
