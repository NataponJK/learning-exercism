//
// This is only a SKELETON file for the 'Wordy' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const OPERATIONS = {
  'plus': (a, b) => a + b,
  'minus': (a, b) => a - b,
  'multiplied by': (a, b) => a * b,
  'divided by': (a, b) => a / b,
};

export const answer = (question) => {
  const cleanedInput = question.replace(/^What is\s?|\?$/g, '');
  if (!cleanedInput) throw new Error('Syntax error');

  //To preserves "multiplied by" as a single token.
  const tokens = cleanedInput.match(/-?\d+|plus|minus|multiplied by|divided by|[a-z]+/g);

  if (isNaN(Number(tokens[0]))) {
    throw new Error(OPERATIONS[tokens[0]] ? 'Syntax error' : 'Unknown operation');
  }

  let result = Number(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operation = tokens[i];
    const operand = tokens[i + 1];

    if (!OPERATIONS[operation]) {
      throw new Error(!isNaN(Number(operation)) ? 'Syntax error' : 'Unknown operation');
    }
    if (operand === undefined) throw new Error('Syntax error');
    const nextNum = Number(operand);
    if (isNaN(nextNum)) throw new Error('Syntax error');

    result = OPERATIONS[operation](result, nextNum);
  }

  return result;
};
