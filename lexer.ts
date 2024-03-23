export type TokenType = 'Number' | 'Identifier' | 'Equals' | 'Adds' | 'Subtracts' | 'Multiplies' | 'Divides' | 'OpenParent' | 'CloseParent' | 'Let';

export type Token = {
  type: TokenType;
  value: string;
}

const anyDigitRegex = /\d/;

const anyLetterRegex = /[a-zA-Z]/;

export function tokenizer(source: string): Token[] {
  const tokens: Token[] = [];
  
  let current = 0;


  while (current < source.length) {
    let char = source[current];

    if (char === '(') {
      tokens.push({ type: 'OpenParent', value: '(' });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: 'CloseParent', value: ')' });
      current++;
      continue;
    }

    if (char === '=') {
      tokens.push({ type: 'Equals', value: '=' });
      current++;
      continue;
    }

    if (char === '+') {
      tokens.push({ type: 'Adds', value: '+' });
      current++;
      continue;
    }

    if (char === '-') {
      tokens.push({ type: 'Subtracts', value: '-' });
      current++;
      continue;
    }

    if (char === '*') {
      tokens.push({ type: 'Multiplies', value: '*' });
      current++;
      continue;
    }

    if (char === '/') {
      tokens.push({ type: 'Divides', value: '/' });
      current++;
      continue;
    }

    if (char === ' ') {
      current++;
      continue;
    }

    if (anyDigitRegex.test(char)) {
      let value = '';

      while (anyDigitRegex.test(char)) {
        value += char;
        char = source[++current];
      }

      tokens.push({ type: 'Number', value });
      continue;
    }

    if (anyLetterRegex.test(char)) {
      let value = '';

      while (anyLetterRegex.test(char) || anyDigitRegex.test(char)) {
        value += char;
        char = source[++current];
      }

      if (value === 'let') {
        tokens.push({ type: 'Let', value });
      } else {
        tokens.push({ type: 'Identifier', value });
      }

      continue;
    }

    throw new Error(`Unrecognized token: ${char}`);
  }
  
  return tokens;
}