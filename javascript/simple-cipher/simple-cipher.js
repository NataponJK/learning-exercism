//
// This is only a SKELETON file for the 'Simple Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH = 26;

export class Cipher {
  constructor(key) {
    if (key === undefined) {
      this._key = this.generateRandomKey();
    } else {
      this._key = key;
    }
  }

  generateRandomKey() {
    let result = '';
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * ALPHABET_LENGTH);
      result += ALPHABET[randomIndex];
    }
    return result;
  }

  encode(plaintext) {
    return [...plaintext].map((char, index) => {
      const shift = ALPHABET.indexOf(this._key[index % this._key.length]);
      const originalIndex = ALPHABET.indexOf(char);
      const newIndex = (originalIndex + shift) % ALPHABET_LENGTH;
      return ALPHABET[newIndex];
    }).join('');
  }

  decode(ciphertext) {
    return [...ciphertext].map((char, index) => {
      const shift = ALPHABET.indexOf(this._key[index % this._key.length]);
      const originalIndex  = ALPHABET.indexOf(char);
      const newIndex = (originalIndex - shift + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      return ALPHABET[newIndex];
    }).join('');
  }

  get key() {
    return this._key;
  }
}
