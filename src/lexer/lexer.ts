import {
    SPECIAL_CHAR_DICTIONARY,
    type Token,
    RESERVED_KEYWORDS_DICTIONARY,
} from '../tokens/tokens'

const ANY_DIGIT_REGEX = /\d/
const ANY_ALPHABETIC_REGEX = /[a-zA-Z]/
const SKIPPABLE = [' ', '\n', '\t', ';']

function isSkippableChar(char: string): boolean {
    return SKIPPABLE.includes(char)
}

function isDigit(char: string): boolean {
    return ANY_DIGIT_REGEX.test(char)
}

function isAlphabetic(char: string): boolean {
    return ANY_ALPHABETIC_REGEX.test(char)
}

export class Tokenizer {
    private readonly _tokens: Token[] = []
    private current = 0

    constructor(private readonly source: string) {
        this.tokenize()
    }

    get tokens(): Token[] {
        return this._tokens
    }

    private get char(): string {
        return this.source[this.current]
    }

    private get nextChar(): string {
        return this.source[this.current + 1]
    }

    private get length(): number {
        return this.source.length
    }

    private get isWithinBounds(): boolean {
        return this.current < this.length
    }

    private tokenize(): void {
        while (this.isWithinBounds) {
            if (this.char === '/' && this.nextChar === '/') {
                this.current += 2
                this.handleInlineComments()
                continue
            }

            if (this.char === '/' && this.nextChar === '*') {
                this.current += 2
                this.handleBlockComments()
                continue
            }

            if (this.char === '=') {
                this.handleEquals(this.char)
                continue
            }

            const isSpecialChar = Object.prototype.hasOwnProperty.call(
                SPECIAL_CHAR_DICTIONARY,
                this.char
            )

            if (isSpecialChar) {
                this._tokens.push({
                    type: SPECIAL_CHAR_DICTIONARY[
                        this.char as keyof typeof SPECIAL_CHAR_DICTIONARY
                    ],
                    value: this.char,
                })
                this.current++
                continue
            }

            if (isSkippableChar(this.char)) {
                this.current++
                continue
            }

            if (isDigit(this.char)) {
                this.handleDigit(this.char)
                continue
            }

            if (isAlphabetic(this.char)) {
                this.handleAlphabetic(this.char)
                continue
            }

            if (this.char === '"') {
                this.handleDoubleQuote(this.char)
                continue
            }

            if (this.char === "'") {
                this.handleSingleQuote(this.char)
                continue
            }

            throw new Error(`Unrecognized token: ${this.char}`)
        }

        this._tokens.push({ type: 'EOF', value: '' })
    }

    private handleBlockComments(): void {
        while (this.isWithinBounds) {
            if (this.char === '*' && this.nextChar === '/') {
                this.current += 2
                return
            }
            this.current++
        }
        throw new SyntaxError('Unterminated block comment')
    }

    private handleInlineComments(): void {
        while (this.char !== '\n' && this.isWithinBounds) {
            this.current++
        }
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

        const isReservedKeyboard = Object.prototype.hasOwnProperty.call(
            RESERVED_KEYWORDS_DICTIONARY,
            value
        )

        if (isReservedKeyboard) {
            this.handleReservedKeywords(
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

    private handleSingleQuote(char: string): void {
        let value = ''
        char = this.source[++this.current]

        while (char !== "'") {
            value += char
            char = this.source[++this.current]
        }

        this._tokens.push({ type: 'StringLiteral', value })
        this.current++
    }

    private handleDoubleQuote(char: string): void {
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

    private handleReservedKeywords(
        value: keyof typeof RESERVED_KEYWORDS_DICTIONARY
    ): void {
        const keywordType = RESERVED_KEYWORDS_DICTIONARY[value]

        if (keywordType == null) {
            throw new Error(`Invalid keyword: ${value}`)
        }

        this._tokens.push({ type: keywordType, value })
    }
}
