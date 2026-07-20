//
// This is only a SKELETON file for the 'Variable Length Quantity' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const SEVEN_BITS_MASK = 0x7F;
const CONTINUATION_BIT = 0x80;

export const encode = (numbers) => {
  return numbers.flatMap(num => {
    if (num === 0) return [0];

    const bytes = [];
    let temp = num;

    while (temp > 0) {
      let byte = temp & SEVEN_BITS_MASK;
      temp >>>= 7;
      
      if (bytes.length > 0) {
        byte |= CONTINUATION_BIT;
      }
      bytes.unshift(byte);
    }
    return bytes;
  })
};

export const decode = (bytes) => {
  const numbers = [];
  let currentNum = 0;
  let hasIncompleteSequence = false;

  for (const byte of bytes) {
    currentNum = (currentNum * 128) + (byte & SEVEN_BITS_MASK);
    if ((byte & CONTINUATION_BIT) !== 0) {
      hasIncompleteSequence = true;
    } else {
      numbers.push(currentNum);
      currentNum = 0;
      hasIncompleteSequence = false;
    }
  }
  if (hasIncompleteSequence) {
    throw new Error('Incomplete sequence');
  }
  return numbers;
};
