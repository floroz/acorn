import { ReservedKeywordsMap } from './reserved-keywords'
import { Token } from './types'

const ANY_DIGIT_REGEX = /\d/
const ANY_ALPHABETIC_REGEX = /[a-zA-Z]/

export function tokenizer(source: string): Token[] {
    const tokens: Token[] = []

    let current = 0

    while (current < source.length) {
        let char = source[current]

        if (char === '(') {
            tokens.push({ type: 'OpenParent', value: '(' })
            current++
            continue
        }

        if (char === ')') {
            tokens.push({ type: 'CloseParent', value: ')' })
            current++
            continue
        }

        if (char === '=') {
            tokens.push({ type: 'Equals', value: '=' })
            current++
            continue
        }

        if (char === '+') {
            tokens.push({ type: 'Adds', value: '+' })
            current++
            continue
        }

        if (char === '-') {
            tokens.push({ type: 'Subtracts', value: '-' })
            current++
            continue
        }

        if (char === '*') {
            tokens.push({ type: 'Multiplies', value: '*' })
            current++
            continue
        }

        if (char === '/') {
            tokens.push({ type: 'Divides', value: '/' })
            current++
            continue
        }

        if (char === ' ') {
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
