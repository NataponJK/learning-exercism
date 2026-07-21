//
// This is only a SKELETON file for the 'Food Chain' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const ANIMALS = [
  { name: 'fly', reaction: '' },
  { name: 'spider', reaction: 'It wriggled and jiggled and tickled inside her.\n', extra: ' that wriggled and jiggled and tickled inside her' },
  { name: 'bird', reaction: 'How absurd to swallow a bird!\n' },
  { name: 'cat', reaction: 'Imagine that, to swallow a cat!\n' },
  { name: 'dog', reaction: 'What a hog, to swallow a dog!\n' },
  { name: 'goat', reaction: 'Just opened her throat and swallowed a goat!\n' },
  { name: 'cow', reaction: 'I don\'t know how she swallowed a cow!\n' },
  { name: 'horse', reaction: 'She\'s dead, of course!\n' }
]

export class Song {
  verse(number) {
    const index = number - 1;
    const currentAnimal = ANIMALS[index];
    let lyrics = `I know an old lady who swallowed a ${currentAnimal.name}.\n`;
    
    if (currentAnimal.name === 'horse') {
      return lyrics + currentAnimal.reaction;
    }
    lyrics += currentAnimal.reaction;
    
    for (let i = index; i > 0; i--) {
      const hunter = ANIMALS[i];
      const prey = ANIMALS[i - 1];
      const extraDesc = (prey.name === 'spider') ? prey.extra : '';
      lyrics += `She swallowed the ${hunter.name} to catch the ${prey.name}${extraDesc}.\n`;
    }
    lyrics += `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
    return lyrics;
  }

  verses(start, end) {
    let result = '';
    for (let i = start; i <= end; i++) {
      result += this.verse(i) + '\n';
    }
    return result;
  }
}
