import {
    Identifier,
    Literal,
    Program,
    type Statement,
    VariableDeclaration,
    BinaryExpression,
} from '../ast/statements'
import { Tokenizer } from '../lexer/lexer'
import { type Token } from '../tokens/tokens'

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
            if (this.currentToken.type === 'EOF') {
                break
            }

            const node = this.parseToken()

            if (node != null) {
                this.program.body.push(node)
            }

            this.moveToNextToken()
        }

        return this.program
    }

    private get currentToken(): Token {
        return this._tokens[this.current]
    }

    private moveToNextToken(): void {
        this.current++
    }

    private parseToken(): Statement {
        const token = this.currentToken

        switch (token.type) {
            case 'Let':
                return this.parseVariableDeclaration('let')
            case 'Const':
                return this.parseVariableDeclaration('const')
            case 'Var':
                return this.parseVariableDeclaration('var')
            case 'Identifier':
                return new Identifier(token.value)
            case 'NumericLiteral':
                return new Literal(Number.parseInt(token.value), token.value)
            case 'StringLiteral':
                return new Literal(token.value, token.value)
            case 'BooleanLiteral':
                return new Literal(Boolean(token.value), token.value)
            case 'Null':
                return new Literal(null, token.value)
            case 'Undefined':
                return new Literal(undefined, token.value)
            case 'Adds':
            case 'Subtracts':
            case 'Multiplies':
            case 'Divides':
                return this.parseBinaryExpression()
            default:
                throw new TypeError(token.type)
        }
    }

    private parseBinaryExpression(): BinaryExpression {
        const token = this.currentToken
        // we expect a binary expression to be followed by a number
        this.moveToNextToken()
        const left = this.parseToken()

        // we expect the right side of the binary expression to be a number
        this.moveToNextToken()
        const right = this.parseToken()

        return new BinaryExpression(token.type, left, right)
    }

    private parseVariableDeclaration(
        kind: 'let' | 'const' | 'var'
    ): VariableDeclaration {
        // we expect a let declaration to be followed by an identifier
        this.moveToNextToken()

        if (this.currentToken.type !== 'Identifier') {
            console.error(
                'Expected Identifier but got: ',
                this.currentToken.type
            )
            throw new TypeError(this.currentToken.type)
        }

        const id = new Identifier(this.currentToken.value)

        // we expect an equals sign after the identifier
        this.moveToNextToken()
        const equals = this.currentToken

        if (equals.type !== 'Equals') {
            console.error('Expected Equals but got: ', equals.type)
            throw new TypeError(equals.type)
        }

        // we know that the right side of the equals sign is the value
        // which can be a single literal, binary expression, a function assinment, etc.
        this.moveToNextToken()

        const init = this.parseToken()

        return new VariableDeclaration(id, init, kind)
    }
}
