type MathOperation = (a: number, b: number) => number;
const OPERATIONS: Record<string, MathOperation> = {
  'plus': (a, b) => a + b,
  'minus': (a, b) => a - b,
  'multiplied by': (a, b) => a * b,
  'divided by': (a, b) => a / b,
};

export const answer = (question: string): number => {
  if (!question.startsWith('What is') || !question.endsWith('?')) {
    throw new Error('Unknown operation');
  }

  const inner = question.slice(8, -1).trim();
  if (!inner) throw new Error('Syntax error');

  const tokens = inner.match(/-?\d+|plus|minus|multiplied by|divided by|[a-z]+/g);
  if (!tokens) throw new Error('Syntax error');

  const firstNum = Number(tokens[0]);
  if (isNaN(firstNum)) {
    const isKnownOp = tokens[0] in OPERATIONS;
    throw new Error(isKnownOp ? 'Syntax error' : 'Unknown operation');
  }

  let result = firstNum;
  for (let i = 1; i < tokens.length; i += 2) {
    const opName = tokens[i];
    const nextValStr = tokens[i + 1];

    if (!(opName in OPERATIONS)) {
      throw new Error(!isNaN(Number(opName)) ? 'Syntax error' : 'Unknown operation');
    }

    if (nextValStr === undefined) throw new Error('Syntax error');
    
    const nextNum = Number(nextValStr);
    if (isNaN(nextNum)) throw new Error('Syntax error');

    result = OPERATIONS[opName](result, nextNum);
  }

  if (tokens.length % 2 === 0) throw new Error('Syntax error');

  return result;
}
