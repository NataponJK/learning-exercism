//
// This is only a SKELETON file for the 'Bottle Song' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const NUMBER_WORDS = [
  'no', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine', 'ten'
]

export const recite = (initialBottlesCount, takeDownCount) => {
  let songLyrics = [];
  for (let i = 0; i < takeDownCount; i++) {
    const currentBottles = initialBottlesCount - i;
    songLyrics = songLyrics.concat(generateVerse(currentBottles));
    if (i < takeDownCount - 1) {
      songLyrics.push('');
    }
  }
  return songLyrics;
};

const generateVerse = (totalCount) => {
  const currentWordCap = NUMBER_WORDS[totalCount].charAt(0).toUpperCase() + NUMBER_WORDS[totalCount].slice(1);
  const nextWordLow = NUMBER_WORDS[totalCount - 1];

  const currentPlural = totalCount === 1 ? '' : 's';
  const nextPlural = totalCount - 1 === 1 ? '' : 's';

  return [
    `${currentWordCap} green bottle${currentPlural} hanging on the wall,`,
    `${currentWordCap} green bottle${currentPlural} hanging on the wall,`,
    `And if one green bottle should accidentally fall,`,
    `There'll be ${nextWordLow} green bottle${nextPlural} hanging on the wall.`
  ];
};