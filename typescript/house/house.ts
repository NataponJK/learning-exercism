interface StoryPart {
  noun: string;
  verb: string;
}

const PARTS: StoryPart[] = [
  { noun: 'house that Jack built.', verb: 'lay in' },
  { noun: 'malt', verb: 'ate' },
  { noun: 'rat', verb: 'killed' },
  { noun: 'cat', verb: 'worried' },
  { noun: 'dog', verb: 'tossed' },
  { noun: 'cow with the crumpled horn', verb: 'milked' },
  { noun: 'maiden all forlorn', verb: 'kissed' },
  { noun: 'man all tattered and torn', verb: 'married' },
  { noun: 'priest all shaven and shorn', verb: 'woke' },
  { noun: 'rooster that crowed in the morn', verb: 'kept' },
  { noun: 'farmer sowing his corn', verb: 'belonged to' },
  { noun: 'horse and the hound and the horn', verb: '' }
];

export function verse(num: number): string[] {
  const lines: string[] = [];
  const currentPart = PARTS[num - 1];
  if (currentPart) {
    lines.push(`This is the ${currentPart.noun}`);
  }
  for (let i = num - 2; i >= 0; i--) {
    const part = PARTS[i];
    if (part) {
      lines.push(`that ${part.verb} the ${part.noun}`);
    }
  }
  return lines;
}

export function verses(start: number, end: number): string[] {
  let result: string[] = [];
  for (let i = start; i <= end; i++) {
    result = result.concat(verse(i));
    if (i < end) {
      result.push('');
    }
  }
  return result;
}
