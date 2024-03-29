/* eslint-disable no-case-declarations */
import {
    Identifier,
    Literal,
    Program,
    type Statement,
    VariableDeclaration,
    BinaryExpression,
} from '../ast/statements'
import { Tokenizer } from '../lexer/lexer'
import { type TokenType, type Token } from '../tokens/tokens'

export class Parser {
    private readonly _tokens!: Token[]
    private readonly program = new Program([])
    private current = 0

    constructor(private readonly source: string) {
        this._tokens = new Tokenizer(this.source).tokens
        // console.log('Tokens: ', this._tokens)
    }

    toAST(): Program {
        while (true) {
            if (
                this.current >= this._tokens.length ||
                this.currentToken?.type === 'EOF'
            ) {
                break
            }

            const node = this.parseStatement()

            if (node != null) {
                this.program.body.push(node)
            }

            this.next()
        }

        return this.program
    }

    private get currentToken(): Token {
        return this._tokens[this.current]
    }

    private next(): void {
        this.current++
    }

    private match(type: TokenType): boolean {
        return this.currentToken.type === type
    }

    private parseStatement(): Statement {
        return this.parseExpression()
    }

    private parseExpression(): Statement {
        return this.parseAddition()
    }

    private parseAddition(): Statement {
        let left = this.parseMultiplication()

        while (this.match('Adds') || this.match('Subtracts')) {
            const operator = this.currentToken.value
            this.next()
            const right = this.parseMultiplication()
            left = new BinaryExpression(operator, left, right)
        }

        return left
    }

    private parseMultiplication(): Statement {
        let left = this.parsePrimary()

        while (
            this.match('Multiplies') ||
            this.match('Divides') ||
            this.match('Modulus')
        ) {
            const operator = this.currentToken.value
            this.next()
            const right = this.parsePrimary()
            left = new BinaryExpression(operator, left, right)
        }

        return left
    }

    private parsePrimary(): Statement {
        const token = this.currentToken

        switch (token.type) {
            case 'NumericLiteral':
                this.next()
                return new Literal(+token.value, token.value)
            case 'StringLiteral':
                this.next()
                return new Literal(token.value, token.value)
            case 'BooleanLiteral':
                this.next()
                return new Literal(token.value === 'true', token.value)
            case 'Null':
                this.next()
                return new Literal(null, token.value)
            case 'Undefined':
                this.next()
                return new Literal(undefined, token.value)
            case 'Identifier':
                this.next()
                return new Identifier(token.value)
            case 'OpenParen':
                this.next()
                const expr = this.parseExpression()
                if (this.currentToken.type !== 'CloseParen') {
                    throw new SyntaxError('Expected closing parenthesis')
                }
                this.next()
                return expr
            default:
                throw new Error(`Unexpected token: ${token.type}`)
        }
    }

    private parseVariableDeclaration(
        kind: 'let' | 'const' | 'var'
    ): VariableDeclaration {
        this.next()

        if (this.currentToken.type !== 'Identifier') {
            console.error(
                'Expected Identifier but got: ',
                this.currentToken.type
            )
            throw new TypeError(this.currentToken.type)
        }

        const id = new Identifier(this.currentToken.value)

        // we expect an equals sign after the identifier
        this.next()
        const equals = this.currentToken

        if (equals.type !== 'Equals') {
            console.error('Expected Equals but got: ', equals.type)
            throw new TypeError(equals.type)
        }

        // we know that the right side of the equals sign is the value
        // which can be a single literal, binary expression, a function assinment, etc.
        this.next()

        const init = this.parseToken()

        return new VariableDeclaration(id, init, kind)
    }
}
