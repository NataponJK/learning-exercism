//
// This is only a SKELETON file for the 'Atbash Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const REVERSED_ALPHABET = [...ALPHABET].reverse().join('');

const translate = (char) => {
  const index = ALPHABET.indexOf(char.toLowerCase());
  return index > -1 ? REVERSED_ALPHABET[index] : char;
}

export const encode = (phrase) => {
  return phrase.toLowerCase()
               .replace(/[^a-z0-9]/g, '')
               .split('')
               .map(translate)
               .join('')
               .match(/.{1,5}/g)
               .join(' ');
};

export const decode = (phrase) => {
  return phrase.replace(/\s/g, '')
               .split('')
               .map(translate)
               .join('');
};
