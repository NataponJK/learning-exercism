export class Crypto {
  private readonly plainText: string;

  constructor(plainText: string) {
    this.plainText = plainText.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  get ciphertext(): string {
    const length = this.plainText.length;
    if (length === 0) { return '' };

    const columns = Math.ceil(Math.sqrt(length));
    const rows = Math.ceil(length / columns);

    const paddedText = this.plainText.padEnd(columns * rows, ' ');
    const segments: string[] = [];
    for (let i = 0; i < rows; i++) {
      segments.push(paddedText.substring(i * columns, (i + 1) * columns));
    }

    const chunks: string[] = [];
    for (let col = 0; col < columns; col++) {
      let chunk = '';
      for (let row = 0; row < rows; row++) {
        chunk += segments[row][col];
      }
      chunks.push(chunk);
    }
    return chunks.join(' ');
  }
}
