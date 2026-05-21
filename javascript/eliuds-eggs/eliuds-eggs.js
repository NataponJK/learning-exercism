//
// This is only a SKELETON file for the 'Eliud's Eggs' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue) => {
  // let count = 0;
  // while (displayValue > 0){
  //   count += (displayValue & 1) //Check if the bit is '1' or not
  //   displayValue >>= 1; //Shift to right to check next bit
  // }
  // return count
  return displayValue.toString(2).split('0').join('').length;
};
