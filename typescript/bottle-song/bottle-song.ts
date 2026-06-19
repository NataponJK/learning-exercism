const NUMBER_WORDS: readonly string[] = [
  'no', 'one', 'two', 'three', 'four', 
  'five', 'six', 'seven', 'eight', 'nine', 'ten'
];

export function recite(initialBottlesCount: number, takeDownCount: number): string[] {
  let songLyrics: string[] = [];
  for (let i = 0; i < takeDownCount; i++) {
    const currentBottles: number = initialBottlesCount - i;
    songLyrics = songLyrics.concat(generateVerse(currentBottles));
    if (i < takeDownCount - 1) {
      songLyrics.push('');
    }
  }
  return songLyrics;
}

function generateVerse(totalCount: number): string[] {
  const currentWord = NUMBER_WORDS[totalCount] ?? '';
  const currentWordCap: string = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
  const nextWordLow: string = NUMBER_WORDS[totalCount - 1] ?? '';

  const currentPlural: string = totalCount === 1 ? '' : 's';
  const nextPlural: string = totalCount - 1 === 1 ? '' : 's';
  
  return [
    `${currentWordCap} green bottle${currentPlural} hanging on the wall,`,
    `${currentWordCap} green bottle${currentPlural} hanging on the wall,`,
    `And if one green bottle should accidentally fall,`,
    `There'll be ${nextWordLow} green bottle${nextPlural} hanging on the wall.`
  ];
}