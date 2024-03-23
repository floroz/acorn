import { Symbols, Token, ReservedKeywordsMap } from './tokens'

const ANY_DIGIT_REGEX = /\d/
const ANY_ALPHABETIC_REGEX = /[a-zA-Z]/
const SKIPPABLE = [' ', '\n', '\t']

export function tokenizer(source: string): Token[] {
    const tokens: Token[] = []

    let current = 0

    while (current < source.length) {
        let char = source[current]

        if (Symbols.hasOwnProperty(char)) {
            tokens.push({ type: Symbols[char], value: char })
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

            tokens.push({ type: 'Number', value })
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

            const isReservedKeyword = ReservedKeywordsMap.has(value)
            if (isReservedKeyword) {
                const keyword = ReservedKeywordsMap.get(value)

                if (!keyword) {
                    throw new Error(`Invalid keyword: ${value}`)
                }

                tokens.push({ type: keyword, value })
            } else {
                tokens.push({ type: 'Identifier', value })
            }

            continue
        }

        throw new Error(`Unrecognized token: ${char}`)
    }

    return tokens
}
