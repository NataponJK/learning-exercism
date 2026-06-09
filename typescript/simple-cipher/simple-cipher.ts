const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH: number = 26;

export class SimpleCipher {
  private _key: string;
  constructor(key?: string) {
    if (key === undefined) {
      this._key = this.generateRandomKey();
    } else {
      this._key = key;
    }
  }

  private generateRandomKey(): string {
    let result: string = '';
    for (let i = 0; i < 100; i++){
      const randomIndex: number = Math.floor(Math.random() * ALPHABET_LENGTH);
      result += ALPHABET[randomIndex];
    }
    return result;
  }
  encode(plaintext: string ): string {
    return [...plaintext].map((char, index): string => {
      const shift: number = ALPHABET.indexOf(this._key[index % this._key.length]);
      const originalIndex: number = ALPHABET.indexOf(char);
      const newIndex: number = (originalIndex + shift) % ALPHABET_LENGTH;
      return ALPHABET[newIndex];
    }).join('');
  }

  decode(ciphertext: string): string {
    return [...ciphertext].map((char, index): string => {
      const shift: number = ALPHABET.indexOf(this._key[index % this._key.length]);
      const originalIndex: number = ALPHABET.indexOf(char);
      const newIndex: number = (originalIndex - shift + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      return ALPHABET[newIndex];
    }).join('');
  }
  
  public get key(): string {
    return this._key;
  }
}
