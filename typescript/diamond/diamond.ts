export function makeDiamond(targetChar: string): string {
  const START_CODE: number = 'A'.charCodeAt(0);
  const maxIndex: number = targetChar.charCodeAt(0) - START_CODE;
  const halfDiamond: string[] = [];
  
  for (let i = 0; i <= maxIndex; i++) {
    const currentChar: string = String.fromCharCode(START_CODE + i);
    const outerSpaces: string = ' '.repeat(maxIndex - i);

    if (i === 0) {
      halfDiamond.push(`${outerSpaces}A${outerSpaces}`);
    } else {
      const innerSpaces = ' '.repeat(2 * i - 1);
      halfDiamond.push(`${outerSpaces}${currentChar}${innerSpaces}${currentChar}${outerSpaces}`);
    }
  }
  const bottomHalf = [...halfDiamond].reverse().slice(1);
  return halfDiamond.concat(bottomHalf).join('\n') + '\n';
}
