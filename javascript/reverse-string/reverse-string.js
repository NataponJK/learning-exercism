//
// This is only a SKELETON file for the 'Reverse String' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const reverseString = (string) => {
  const segmenter = new Intl.Segmenter(undefined, {granularity: `grapheme` });
  const segments = [...segmenter.segment(string)].map(s => s.segment);
  return segments.reverse().join(``);
};
