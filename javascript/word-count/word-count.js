//
// This is only a SKELETON file for the 'Word Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const countWords = (phrase) => {
  const words = phrase.toLowerCase().match(/\b[\w']+\b/g);
  return words.reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {});
};
