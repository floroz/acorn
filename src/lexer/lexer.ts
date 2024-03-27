import {
    SPECIAL_CHAR_DICTIONARY,
    type Token,
    RESERVED_KEYWORDS_DICTIONARY,
} from '../tokens/tokens'

const ANY_DIGIT_REGEX = /\d/
const ANY_ALPHABETIC_REGEX = /[a-zA-Z]/
const SKIPPABLE = [' ', '\n', '\t', ';']

export class Tokenizer {
    private readonly _tokens: Token[] = []
    private current = 0

    constructor(private readonly source: string) {
        this.tokenize()
    }

    public get tokens(): Token[] {
        return this._tokens
    }

    private tokenize(): Token[] {
        const len = this.source.length

        while (this.current < len) {
            const char = this.source[this.current]

            if (char === '=') {
                this.handleEquals(char)
                continue
            }

            const isSpecialChar = Object.prototype.hasOwnProperty.call(
                SPECIAL_CHAR_DICTIONARY,
                char
            )

            if (isSpecialChar) {
                this._tokens.push({
                    type: SPECIAL_CHAR_DICTIONARY[
                        char as keyof typeof SPECIAL_CHAR_DICTIONARY
                    ],
                    value: char,
                })
                this.current++
                continue
            }

            if (SKIPPABLE.includes(char)) {
                this.current++
                continue
            }

            if (ANY_DIGIT_REGEX.test(char)) {
                this.handleDigit(char)
                continue
            }

            if (ANY_ALPHABETIC_REGEX.test(char)) {
                this.handleAlphabetic(char)
                continue
            }

            if (char === '"') {
                this.handleDoubleQuoteString(char)
                continue
            }

            if (char === "'") {
                this.handleSingleQuoteString(char)
                continue
            }

            throw new Error(`Unrecognized token: ${char}`)
        }

        this._tokens.push({ type: 'EOF', value: '' })

        return this._tokens
    }

    private handleAlphabetic(char: string): void {
        let value = ''

        while (
            char != null &&
            (ANY_ALPHABETIC_REGEX.test(char) || ANY_DIGIT_REGEX.test(char))
        ) {
            value += char
            this.current++
            char = this.source[this.current]
        }

        if (value === 'true' || value === 'false') {
            this._tokens.push({ type: 'BooleanLiteral', value })
            return
        }

        const isReservedKeyword = Object.prototype.hasOwnProperty.call(
            RESERVED_KEYWORDS_DICTIONARY,
            value
        )

        if (isReservedKeyword) {
            this.handleReservedKeyword(
                value as keyof typeof RESERVED_KEYWORDS_DICTIONARY
            )
            return
        }

        this._tokens.push({ type: 'Identifier', value })
    }

    private handleDigit(char: string): void {
        let value = ''

        while (
            ANY_DIGIT_REGEX.test(char) ||
            char === '.' ||
            char === 'e' ||
            char === 'E' ||
            char === '+' ||
            char === '-' ||
            char === '_'
        ) {
            value += char
            char = this.source[++this.current]
        }

        this._tokens.push({ type: 'NumericLiteral', value })
    }

    private handleSingleQuoteString(char: string): void {
        let value = ''
        char = this.source[++this.current]

        while (char !== "'") {
            value += char
            char = this.source[++this.current]
        }

        this._tokens.push({ type: 'StringLiteral', value })
        this.current++
    }

    private handleDoubleQuoteString(char: string): void {
        let value = ''
        char = this.source[++this.current]

        while (char !== '"') {
            value += char
            char = this.source[++this.current]
        }

        this._tokens.push({ type: 'StringLiteral', value })
        this.current++
    }

    private handleEquals(char: string): void {
        const nextChar = this.source[this.current + 1]

        if (nextChar === '>') {
            this._tokens.push({ type: 'ArrowFunction', value: '=>' })
            this.current += 2
            return
        }

        this._tokens.push({ type: 'Equals', value: char })
        this.current++
    }

    private handleReservedKeyword(
        value: keyof typeof RESERVED_KEYWORDS_DICTIONARY
    ): void {
        const keywordType = RESERVED_KEYWORDS_DICTIONARY[value]

        if (keywordType == null) {
            throw new Error(`Invalid keyword: ${value}`)
        }

        this._tokens.push({ type: keywordType, value })
    }
}
