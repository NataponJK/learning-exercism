//
// This is only a SKELETON file for the 'ETL' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const transform = (data) => {
  const newData = {};
  for (const [score, letter] of Object.entries(data)){
    letter.forEach(letter => {
      newData[letter.toLowerCase()] = Number(score);
    })
  }
  return newData;
};
