//
// This is only a SKELETON file for the 'Pop Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue: number): number => {
  let count: number = 0;
  let current: number = displayValue;
  while (current > 0){
    count += (current & 1);
    current >>= 1;
  }
  return count;
  // return displayValue.toString(2).split('0').join('').length; //Slower
}
