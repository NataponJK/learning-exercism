//
// This is only a SKELETON file for the 'Crypto Square' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Crypto {
  constructor(plainText) {
    this.plainText = plainText;
  }

  get ciphertext() {
    const normalized = this.plainText.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized.length === 0) { return '' };

    const columns = Math.ceil(Math.sqrt(normalized.length));
    const segments = [];
    for (let i = 0; i < normalized.length; i += columns) {
      segments.push(normalized.slice(i, i + columns).padEnd(columns, ' '));
    }

    const chunks = [];
    for (let col = 0; col < columns; col++) {
      let currentChunk = '';
      for (let row = 0; row < segments.length; row++) {
        currentChunk += segments[row][col];
      }
      chunks.push(currentChunk);
    }
    return chunks.join(' ');
  }
}
