//
// This is only a SKELETON file for the 'Proverb' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const proverb = (...inputs) => {
  if (inputs.length === 0) return '';
  
  let lines = [];
  let words = inputs;
  let qualifier = '';

  const lastInput = inputs[inputs.length - 1];
  if (typeof lastInput === 'object' && lastInput !== null && 'qualifier' in lastInput) {
    qualifier = `${lastInput.qualifier} `;
    words = inputs.slice(0, -1);
  }

  for (let i = 0; i < words.length - 1; i++) {
    lines.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.`);
  }
  lines.push(`And all for the want of a ${qualifier}${words[0]}.`);

  return lines.join('\n');
};
