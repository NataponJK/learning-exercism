//
// This is only a SKELETON file for the 'Phone Number' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const clean = (number) => {
  //Validate letters or punctuations
  if (/[a-zA-Z]/.test(number)) throw new Error('Letters not permitted');
  if (/[@:!]/.test(number)) throw new Error('Punctuations not permitted');
  //Remove non-digit and check length
  let digits = number.replace(/\D/g, '');
  if (digits.length < 10) throw new Error('Must not be fewer than 10 digits');
  if (digits.length > 11) throw new Error('Must not be greater than 11 digits');
  //Handle 11-digits that starting with 1
  if (digits.length === 11){
    if (digits[0] !== '1') throw new Error('11 digits must start with 1');
    digits = digits.slice(1);
  }
  //Validate Area (index 0) and Exchange (index 3)
  if (digits[0] === '0') throw new Error('Area code cannot start with zero');
  if (digits[0] === '1') throw new Error('Area code cannot start with one');
  if (digits[3] === '0') throw new Error('Exchange code cannot start with zero');
  if (digits[3] === '1') throw new Error('Exchange code cannot start with one');

  return digits;
};
