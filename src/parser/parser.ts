import {
    Identifier,
    Literal,
    Program,
    Statement,
    VariableDeclaration,
} from '../ast/statements'
import { tokenizer } from '../lexer/lexer'
import { Token } from '../tokens/tokens'

export class Parser {
    private _tokens!: Token[]
    private program = new Program([])
    private current = 0

    parse(source: string): Program {
        this._tokens = this.tokenize(source)

        console.log('Tokens: ', this._tokens)

        while (this._tokens[this.current].type !== 'EOF') {
            if (this._tokens[this.current].type === 'EndOfLine') {
                this.moveToNextToken()
                continue
            }
            this.program.body.push(this.parseToken())

            this.moveToNextToken()
        }

        return this.program
    }

    private tokenize(source: string) {
        return tokenizer(source)
    }

    private get currentToken() {
        return this._tokens[this.current]
    }

    private moveToNextToken() {
        this.current++
    }

    private parseToken(): Statement {
        let token = this.currentToken

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
            default:
                throw new TypeError(token.type)
        }
    }

    private parseVariableDeclaration(kind: 'let' | 'const' | 'var') {
        // we expect a let declaration to be followed by an identifier
        this.moveToNextToken()
        const identifier = this.currentToken

        if (identifier.type !== 'Identifier') {
            console.error('Expected Identifier but got: ', identifier.type)
            throw new TypeError(identifier.type)
        }

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
        return new VariableDeclaration(
            new Identifier(identifier.value),
            this.parseToken(),
            kind
        )
    }
}
