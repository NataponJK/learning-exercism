//
// This is only a SKELETON file for the 'Line Up' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const format = (name, number) => {
  let suffix = `th`;
  const lastTwoDigit = number % 100;
  const lastDigit = number % 10;
  
  if (lastTwoDigit < 11 || lastTwoDigit > 13){
    if (lastDigit === 1) suffix = `st`;
    else if (lastDigit === 2) suffix = `nd`;
    else if (lastDigit === 3) suffix = `rd`;
  }

  return `${name}, you are the ${number}${suffix} customer we serve today. Thank you!`
};
