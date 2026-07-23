const DAYS: string[] = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];

const GIFTS: string[] = [
  'a Partridge in a Pear Tree.',
  'two Turtle Doves, and ',
  'three French Hens, ',
  'four Calling Birds, ',
  'five Gold Rings, ',
  'six Geese-a-Laying, ',
  'seven Swans-a-Swimming, ',
  'eight Maids-a-Milking, ',
  'nine Ladies Dancing, ',
  'ten Lords-a-Leaping, ',
  'eleven Pipers Piping, ',
  'twelve Drummers Drumming, '
];

export function recite(startVerse: number, endVerse: number): string {
  const output: string[] = [];
  
  for (let i = startVerse; i <= endVerse; i++) {
    output.push(getVerse(i));
  }
  
  return output.join('\n') + '\n';
}

function getVerse(dayNumber: number): string {
  const index = dayNumber - 1;
  let verse = `On the ${DAYS[index]} day of Christmas my true love gave to me: `;
  
  for (let i = index; i >= 0; i--) {
    verse += GIFTS[i];
  }
  
  return verse;
}