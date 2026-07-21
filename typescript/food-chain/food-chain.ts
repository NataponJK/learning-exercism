interface Animal {
  name: string;
  exclamation?: string;
}

const ANIMALS: Animal[] = [
  { name: 'fly' },
  { name: 'spider', exclamation: 'It wriggled and jiggled and tickled inside her.' },
  { name: 'bird', exclamation: 'How absurd to swallow a bird!' },
  { name: 'cat', exclamation: 'Imagine that, to swallow a cat!' },
  { name: 'dog', exclamation: 'What a hog, to swallow a dog!' },
  { name: 'goat', exclamation: 'Just opened her throat and swallowed a goat!' },
  { name: 'cow', exclamation: 'I don\'t know how she swallowed a cow!' },
  { name: 'horse' }
];

export function verse(verseNumber: number): string {
  const index = verseNumber - 1;
  const currentAnimal = ANIMALS[index];
  let lyrics: string[] = [];

  lyrics.push(`I know an old lady who swallowed a ${currentAnimal.name}.`);
  if (currentAnimal.exclamation) {
    lyrics.push(currentAnimal.exclamation);
  }

  if (currentAnimal.name === 'horse') {
    lyrics.push("She's dead, of course!");
    return lyrics.join('\n') + '\n';
  }

  for (let i = index; i > 0; i--) {
    const predator = ANIMALS[i];
    const prey = ANIMALS[i - 1];
    let line = `She swallowed the ${predator.name} to catch the ${prey.name}`;
    if (prey.name === 'spider') {
      line += ' that wriggled and jiggled and tickled inside her';
    }
    lyrics.push(line + '.');
  }

  lyrics.push("I don't know why she swallowed the fly. Perhaps she'll die.");
  return lyrics.join('\n') + '\n';
}

export function verses(start: number, end: number): string {
  const result: string[] = [];
  for (let i = start; i <= end; i++) {
    result.push(verse(i));
  }
  return result.join('\n');
}
