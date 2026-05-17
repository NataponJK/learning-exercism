type RomanMapping = [number, string][];

const ROMAN_MAP: RomanMapping = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(number: number): string {
  let result: string = '';
  let remaining: number = number; //to secure type mutation of input

  for (const [value, symbol] of ROMAN_MAP){
    while (remaining >= value){
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}
