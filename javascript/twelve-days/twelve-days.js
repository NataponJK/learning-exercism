//
// This is only a SKELETON file for the 'Twelve Days' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const DAYS = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];

const GIFTS = [
  'a Partridge in a Pear Tree.',
  'two Turtle Doves, ',
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

export const recite = (startVerse, endVerse) => {
  let output = [];
  for (let i = startVerse; i <= (endVerse || startVerse); i++) {
    output.push(getVerse(i));
  }
  return output.join('\n');
};


const getVerse = (dayNumber) => {
  const index = dayNumber - 1;
  let intro = `On the ${DAYS[index]} day of Christmas my true love gave to me: `;
  let giftsList = '';

  for (let i = index; i >= 0; i--) {
    if (index > 0 && i === 0) {
      giftsList += 'and ';
    }
    giftsList += GIFTS[i];
  }

  return intro + giftsList + '\n';
};
