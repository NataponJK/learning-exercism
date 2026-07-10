//
// This is only a SKELETON file for the 'House' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const PARTS = [
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
]

export class House {
  static verse(num) {
    const lines = [];
    lines.push(`This is the ${PARTS[num - 1].noun}`);
    for (let i = num - 2; i >= 0; i--) {
      lines.push(`that ${PARTS[i].verb} the ${PARTS[i].noun}`);
    }
    return lines;
  }

  static verses(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
      result = result.concat(this.verse(i));
      if (i < end) {
        result.push('');
      }
    }
    return result;
  }
}
