export function convert(digits: number[], fromRadix: number, endRadix: number): number[] {
  if (fromRadix === undefined || fromRadix < 2 || !Number.isInteger(fromRadix)) {
    throw new Error('Wrong input base');
  }

  if (endRadix === undefined || endRadix < 2 || !Number.isInteger(endRadix)) {
    throw new Error('Wrong output base');
  }

  if (!Array.isArray(digits) || digits.length === 0 
      || (digits.length > 1 && digits[0] === 0)) {
        throw new Error('Input has wrong format');
      }
  
   let decimalValue: number = 0;
   for (const digit of digits) {
    if (digit < 0 || digit >= fromRadix || !Number.isInteger(digit)) {
      throw new Error('Input has wrong format');
    }
    decimalValue = decimalValue * fromRadix + digit;
   }
   if (decimalValue == 0) { return [0] };
   
   const result: number[] = [];
   while (decimalValue > 0) {
    result.unshift(decimalValue % endRadix);
    decimalValue = Math.floor(decimalValue / endRadix);
   }
   return result;
}
