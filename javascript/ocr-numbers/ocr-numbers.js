//
// This is only a SKELETON file for the 'OCR Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const OCR_MAP = {
  ' _ | ||_|   ': '0',
  '     |  |   ': '1',
  ' _  _||_    ': '2',
  ' _  _| _|   ': '3',
  '   |_|  |   ': '4',
  ' _ |_  _|   ': '5',
  ' _ |_ |_|   ': '6',
  ' _   |  |   ': '7',
  ' _ |_||_|   ': '8',
  ' _ |_| _|   ': '9',
};

export const convert = (input) => {
  const lines = input.split('\n');

  if (lines.length % 4 !== 0) {
    throw new Error('Number of lines must be a multiple of four.');
  }
  if (lines.some((line) => line.length % 3 !== 0)) {
    throw new Error('Number of columns must be a multiple of three.');
  }

  const outputRows = [];
  for (let r = 0; r < lines.length; r += 4) {
    let rowText = '';
    const totalDigitsInRow = lines[r].length / 3;

    for (let d = 0; d < totalDigitsInRow; d++) {
      const colStart = d * 3;
      const colEnd = colStart + 3;
      const cellKey = lines[r].slice(colStart, colEnd) 
                    + lines[r + 1].slice(colStart, colEnd) 
                    + lines[r + 2].slice(colStart, colEnd) 
                    + lines[r + 3].slice(colStart, colEnd);
      rowText += OCR_MAP[cellKey] || '?';
    }
    outputRows.push(rowText);
  }
  return outputRows.join(',');
};
