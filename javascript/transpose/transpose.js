//
// This is only a SKELETON file for the 'Transpose' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const transpose = (input) => {
  if (input.length === 0) return [];
  //Find maximum length
  const maxLength = Math.max(...input.map(row => row.length));
  //Build matrix
  return Array.from({ length: maxLength }, (_, colIndex) => {
    return input.reduceRight((acc, row) => {
      const char = row[colIndex];
      if (char !== undefined) {
        return char + acc;
      }
      //If is accumulated text, pad with space
      //if acc is empty, no rows below, don't pad
      return (acc ? ' ' : '') + acc;
    }, '');
  });
};
