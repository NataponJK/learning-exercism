//
// This is only a SKELETON file for the 'Parallel Letter Frequency' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const parallelLetterFrequency = async (texts) => {
  const frequencies = {};
  const tasks = texts.map((text) => countTextLetters(frequencies, text));

  await Promise.all(tasks);
  return frequencies;
};

const countTextLetters = (frequencies, text) => {
  return new Promise((resolve) => {
    const letters = text.toLowerCase().match(/\p{Letter}/gu) || [];
    for (const letter of letters) {
      frequencies[letter] = (frequencies[letter] || 0) + 1;
    }
    
    resolve();
  })
}
