//
// This is only a SKELETON file for the 'Rotational Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const A_CODE = 65;
const a_CODE = 97;

export const rotate = (text, key) => {
  return [...text].map((char) => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - A_CODE + key) % 26) + A_CODE);
    }
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((char.charCodeAt(0) - a_CODE + key) % 26) + a_CODE);
    }
    return char;
  }).join('');
};
