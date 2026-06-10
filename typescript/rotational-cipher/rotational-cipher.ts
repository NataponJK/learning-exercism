const A_CODE: number = 65;
const a_CODE: number = 97;

export function rotate(text: string, key: number): string {
  return [...text].map((char: string): string => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - A_CODE + key) % 26) + A_CODE);
    }
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((char.charCodeAt(0) - a_CODE + key) % 26) + a_CODE);
    }
    return char;
  }).join('');
}
