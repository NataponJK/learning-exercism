const ONES: string[] = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 
  'seventeen', 'eighteen', 'nineteen'
];

const TENS: string[] = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const SCALES: string[] = ['', 'thousand', 'million', 'billion'];

function translateUnderThousand(num: number): string {
  if (num === 0) return '';
  const parts: string[] = [];
  if (num >= 100) {
    parts.push(`${ONES[Math.floor(num / 100)]} hundred`);
    num %= 100;
  }
  if (num >= 20) {
    const remainder = num % 10;
    parts.push(remainder ? `${TENS[Math.floor(num / 10)]}-${ONES[remainder]}` : TENS[Math.floor(num / 10)]);
  } else if (num > 0) {
    parts.push(ONES[num]);
  }
  return parts.join(' ');
}
export function sayInEnglish(number: number): string {
  if (number < 0 || number > 999_999_999_999) {
    throw new Error('Number must be between 0 and 999,999,999,999.');
  }
  if (number === 0) return 'zero';
  const chunks: string[] = [];
  let currentScale = 0;
  while (number > 0) {
    const chunk = number % 1000;
    if (chunk > 0) {
      const chunkWords = translateUnderThousand(chunk);
      const scaleWord = SCALES[currentScale];
      chunks.unshift(scaleWord ? `${chunkWords} ${scaleWord}` : chunkWords);
    }
    number = Math.floor(number / 1000);
    currentScale++;
  }
  return chunks.join(' ').trim();
}
