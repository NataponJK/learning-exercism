const SEVEN_BITS_MASK = 0x7F;
const CONTINUATION_BIT = 0x80;

export function encode(numbers: number[]): number[] {
  return numbers.flatMap((num: number): number[] => {
    if (num === 0) return [0];

    const bytes: number[] = [];
    let temp: number = num;

    while (temp > 0) {
      let byte: number = temp & SEVEN_BITS_MASK;
      temp >>>= 7;

      if (bytes.length > 0) {
        byte |= CONTINUATION_BIT;
      }
      bytes.unshift(byte);
    }
    return bytes;
  })
}

export function decode(bytes: number[]): number[] {
  const numbers: number[] = [];
  let currentNum: number = 0;
  let hasIncompleteSequence: boolean = false;

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
}
