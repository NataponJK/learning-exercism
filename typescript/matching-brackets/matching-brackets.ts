type ClosingBracket = '}' | ']' | ')';
type OpeningBracket = '{' | '[' | '(';

export function isPaired(input: string): boolean {
  const stack: OpeningBracket[] = [];
  const pairs: Record<ClosingBracket, OpeningBracket> = {
    '}': '{',
    ']': '[',
    ')': '(',
  };
  const openingBrackets = new Set<string>(['{', '[', '(']);
  for (const char of input) {
    if (openingBrackets.has(char)){
      stack.push(char as OpeningBracket);
    } else if (char in pairs){
      const closing = char as ClosingBracket
      if (stack.pop() !== pairs[closing]){
        return false;
        }
    }
  }
  return stack.length === 0;
}
