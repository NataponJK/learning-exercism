export function format(name: string, number: number): string {
  let suffix: string = `th`;
  const lastTwoDigit = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigit < 11 || lastTwoDigit > 13){
    if (lastDigit === 1) suffix = `st`;
    else if (lastDigit === 2) suffix = `nd`;
    else if (lastDigit === 3) suffix = 'rd';
  }
  return `${name}, you are the ${number}${suffix} customer we serve today. Thank you!`
}
