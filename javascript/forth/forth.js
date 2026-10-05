//
// This is only a SKELETON file for the 'Forth' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Forth {
  constructor() {
    this._stack = [];
    this._words = new Map();
    this._initializeBuiltins();
  }

  _initializeBuiltins() {
    this._words.set('+', () => { this._ensureStackSize(2); const b = this._stack.pop(); const a = this._stack.pop(); this._stack.push(a + b); });
    this._words.set('-', () => { this._ensureStackSize(2); const b = this._stack.pop(); const a = this._stack.pop(); this._stack.push(a - b); });
    this._words.set('*', () => { this._ensureStackSize(2); const b = this._stack.pop(); const a = this._stack.pop(); this._stack.push(a * b); });
    this._words.set('/', () => {
      this._ensureStackSize(2);
      const b = this._stack.pop();
      if (b === 0) throw new Error('Division by zero');
      const a = this._stack.pop();
      this._stack.push(Math.floor(a / b));
    });
    this._words.set('dup', () => { this._ensureStackSize(1); this._stack.push(this._stack[this._stack.length - 1]); });
    this._words.set('drop', () => { this._ensureStackSize(1); this._stack.pop(); });
    this._words.set('swap', () => { this._ensureStackSize(2); const b = this._stack.pop(); const a = this._stack.pop(); this._stack.push(b, a); });
    this._words.set('over', () => { this._ensureStackSize(2); this._stack.push(this._stack[this._stack.length - 2]); });
  }

  _ensureStackSize(requiredSize) {
    if (this._stack.length === 0) {
      throw new Error('Stack empty');
    }
    if (this._stack.length < requiredSize) {
      throw new Error('Only one value on the stack');
    }
  }

  evaluate(inputData) {
    const tokens = inputData.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    let i = 0;

    while (i < tokens.length) {
      const token = tokens[i];

      if (token === ':') {
        const semiColonIndex = tokens.indexOf(';', i);
        if (semiColonIndex === -1) {
          throw new Error('Invalid definition');
        }

        const wordName = tokens[i + 1];
        if (/^-?\d+$/.test(wordName)) {
          throw new Error('Invalid definition');
        }

        const definitionTokens = tokens.slice(i + 2, semiColonIndex);
        
        const resolvedTokens = [];
        for (const t of definitionTokens) {
          if (this._words.has(t)) {
            const definition = this._words.get(t);
            if (typeof definition === 'function') {
              resolvedTokens.push(t);
            } else {
              resolvedTokens.push(...definition);
            }
          } else {
            resolvedTokens.push(t);
          }
        }

        this._words.set(wordName, resolvedTokens);
        i = semiColonIndex + 1;
        continue;
      }

      this._executeToken(token);
      i++;
    }
  }
  
  _executeToken(token) {
    if (/^-?\d+$/.test(token)) {
      this._stack.push(Number(token));
      return;
    }

    if (this._words.has(token)) {
      const operation = this._words.get(token);
      if (typeof operation === 'function') {
        operation();
      } else {
        for (const macroToken of operation) {
          this._executeToken(macroToken);
        }
      }
      return;
    }
    
    throw new Error('Unknown command');
  }

  get stack() {
    return this._stack;
  }
}
