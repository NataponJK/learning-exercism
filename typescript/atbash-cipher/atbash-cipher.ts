const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const REVERSED_ALPHABET = [...ALPHABET].reverse().join('');

const translate = (char: string): string => {
  const index = ALPHABET.indexOf(char.toLowerCase());
  return index > -1 ? REVERSED_ALPHABET[index] : char;
}

export function encode(phrase: string): string {
  const cleaned = phrase.toLowerCase().replace(/[^a-z0-9]/g, '');
  const encoded = [...cleaned].map(translate).join('');

  return encoded.match(/.{1,5}/g)?.join(' ') || '';
}

export function decode(phrase: string): string {
  const cleaned = phrase.replace(/\s/g, '');
  return [...cleaned].map(translate).join('');
}
