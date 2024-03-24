import {
    SPECIAL_CHAR_DICTIONARY,
    Token,
    RESERVED_KEYWORDS_DICTIONARY,
    TokenType,
} from '../tokens/tokens'

const ANY_DIGIT_REGEX = /\d/
const ANY_ALPHABETIC_REGEX = /[a-zA-Z]/
const SKIPPABLE = [' ', '\n', '\t']

export function tokenizer(source: string): Token[] {
    const tokens: Token[] = []

    let current = 0

    while (current < source.length) {
        let char = source[current]

        // TODO: handle comments

        // arrow function is a special symbol since it's composed of two characters
        if (char === '=') {
            const nextChar = source[current + 1]

            if (nextChar === '>') {
                tokens.push({ type: 'ArrowFunction', value: '=>' })
                current += 2
                continue
            } else {
                tokens.push({ type: 'Equals', value: char })
                current++
                continue
            }
        }

        if (SPECIAL_CHAR_DICTIONARY.hasOwnProperty(char)) {
            tokens.push({
                type: SPECIAL_CHAR_DICTIONARY[
                    char as keyof typeof SPECIAL_CHAR_DICTIONARY
                ],
                value: char,
            })
            current++
            continue
        }

        if (SKIPPABLE.includes(char)) {
            current++
            continue
        }

        if (ANY_DIGIT_REGEX.test(char)) {
            let value = ''

            while (ANY_DIGIT_REGEX.test(char)) {
                value += char
                char = source[++current]
            }

            tokens.push({ type: 'NumericLiteral', value })
            continue
        }

        if (ANY_ALPHABETIC_REGEX.test(char)) {
            let value = ''

            while (
                ANY_ALPHABETIC_REGEX.test(char) ||
                ANY_DIGIT_REGEX.test(char)
            ) {
                value += char
                char = source[++current]
            }

            const isReservedKeyword =
                RESERVED_KEYWORDS_DICTIONARY.hasOwnProperty(value)

            if (isReservedKeyword) {
                const keywordType =
                    RESERVED_KEYWORDS_DICTIONARY[
                        value as keyof typeof RESERVED_KEYWORDS_DICTIONARY
                    ]

                if (!keywordType) {
                    throw new Error(`Invalid keyword: ${value}`)
                }

                tokens.push({ type: keywordType, value })
                continue;
            } 

            if (value === 'true' || value === 'false') {
                tokens.push({ type: 'BooleanLiteral', value })
                continue
            }
        
        
            tokens.push({ type: 'Identifier', value })
            continue
        }

        // TODO: handle string escape characters
        if (char === '"') {
            let value = ''
            char = source[++current]

            while (char !== '"') {
                value += char
                char = source[++current]
            }

            tokens.push({ type: 'StringLiteral', value })
            current++
            continue
        }

       // TODO: handle string escape characters
        if (char === "'") {
            let value = ''
            char = source[++current]

            while (char !== "'") {
                value += char
                char = source[++current]
            }

            tokens.push({ type: 'StringLiteral', value })
            current++
            continue
        }

        throw new Error(`Unrecognized token: ${char}`)
    }

    tokens.push({ type: 'EOF', value: '' })

    return tokens
}
