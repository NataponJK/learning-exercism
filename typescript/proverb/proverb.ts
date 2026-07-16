interface ProverbOptions {
  qualifier: string;
}

type ProverbInput = string | ProverbOptions;

export function proverb(...inputs: ProverbInput[]): string {
  if (inputs.length === 0) return '';
  
  let lines: string[] = [];
  let words: string[] = [];
  let qualifier = '';

  const lastInput = inputs[inputs.length - 1];

  if (typeof lastInput === 'object' && lastInput !== null && 'qualifier' in lastInput) {
    qualifier = `${(lastInput as ProverbOptions).qualifier} `;
    words = inputs.slice(0, -1) as string[];
  } else {
    words = inputs as string[];
  }
  for (let i = 0; i < words.length - 1; i++) {
    lines.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.`);
  }
  if (words.length > 0) {
    lines.push(`And all for the want of a ${qualifier}${words[0]}.`);
  }
  return lines.join('\n');
}
