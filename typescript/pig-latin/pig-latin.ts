export function translate(phrase: string): string {
  return phrase.split(' ').map((word: string): string => {
    if (/^(?:[aeiou]|xr|yt)/i.test(word)) {
      return `${word}ay`;
    }
    const quMatch = word.match(/^([^aeiou]*qu)(.+)$/i);
    if (quMatch) {
      return `${quMatch[2]}${quMatch[1]}ay`;
    }
    const yMatch = word.match(/^([^aeiou]+)(y.+)$/i);
    if (yMatch) {
      return `${yMatch[2]}${yMatch[1]}ay`;
    }
    const consMatch= word.match(/^([^aeiou]+)(.+)$/i);
    if (consMatch) {
      return `${consMatch[2]}${consMatch[1]}ay`;
    }
    return word;
  })
  .join(' ');
}
