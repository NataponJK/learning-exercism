const M = 26;
const gcd = (x, y) => (!y ? x : gcd(y, x % y));

const findMMI = (a, m) => {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
}

export const encode = (phrase, key) => {
  const { a, b } = key;
  if (gcd(a, M) !== 1) {
    throw new Error('a and m must be coprime.');
  }
  const cleanText = phrase.toLowerCase().replace(/[^a-z0-9]/g, '');
  const encoded = [...cleanText].map((char) => {
    if (/[0-9]/.test(char)) return char;

    const x = char.charCodeAt(0) - 97;
    const cipherIndex = (a * x + b) % M;
    return String.fromCharCode(cipherIndex + 97);
  }).join('');

  return encoded.match(/.{1,5}/g)?.join(' ') || '';
};

export const decode = (phrase, key) => {
  const { a, b } = key;
  if (gcd(a, M) !== 1) {
    throw new Error('a and m must be coprime.');
  }

  const cleanText = phrase.replace(/\s/g, '');
  const aInverse = findMMI(a, M);

  return [...cleanText].map((char) => {
    if (/[0-9]/.test(char)) return char;

    const y = char.charCodeAt(0) - 97;

    const plainIndex = (aInverse * (y - b % M + M)) % M;
    return String.fromCharCode(plainIndex + 97)
  }).join('');
};
