/* eslint-disable no-case-declarations */
import {
    Identifier,
    Literal,
    Program,
    type Statement,
    VariableDeclaration,
    BinaryExpression,
    FunctionDeclaration,
    BlockStatement,
    AssignmentExpression,
    ReturnStatement,
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

    parse(): Program {
        while (true) {
            if (
                this.current >= this._tokens.length ||
                this.token()?.type === 'EOF'
            ) {
                break
            }

            const node = this.parseStatement()

            if (node != null) {
                this.program.body.push(node)
            }

            this.ingest()
        }

        return this.program
    }

    // this must be a method and not a getter, to provide the correct type inference
    // when the method is called after an ingestion.
    private token(): Token {
        return this._tokens[this.current]
    }

    private ingest(): Token {
        this.current++
        return this.token()
    }

    private match(type: TokenType): boolean {
        return this.token().type === type
    }

    private parseStatement(): Statement {
        const type = this.token().type

        switch (type) {
            case 'Let':
            case 'Const':
            case 'Var':
                return this.parseVariableDeclaration(type)
            case 'Function':
                return this.parseFunctionDeclaration()
            case 'Return':
                return this.parseReturnStatement()
            default:
                return this.parseExpression()
        }
    }

    private parseExpression(): Statement {
        return this.parseAssignmentExpression()
    }

    private parseAssignmentExpression(): Statement {
        const left = this.parseAdditiveExpression()

        if (this.match('Equals')) {
            const operator = this.token().value
            this.ingest()
            const right = this.parseExpression()
            const expression = new AssignmentExpression(operator, left, right)
            return expression
        }

        const lookahead = this._tokens[this.current + 1]

        if (
            (this.match('Adds') ||
                this.match('Subtracts') ||
                this.match('Multiplies') ||
                this.match('Divides')) &&
            lookahead.type === 'Equals'
        ) {
            const operator = this.token().value + lookahead.value
            this.ingest()
            this.ingest()
            const right = this.parseExpression()
            const expression = new AssignmentExpression(operator, left, right)
            return expression
        }
        return left
    }

    private parseAdditiveExpression(): Statement {
        let left = this.parseMultiplicativeExpression()

        while (
            (this.match('Adds') || this.match('Subtracts')) &&
            // exclude compund assignment operators
            this._tokens[this.current + 1].type !== 'Equals'
        ) {
            const operator = this.token().value
            this.ingest()
            const right = this.parseMultiplicativeExpression()
            left = new BinaryExpression(operator, left, right)
        }

        return left
    }

    private parseMultiplicativeExpression(): Statement {
        let left = this.parsePrimary()

        while (
            (this.match('Multiplies') ||
                this.match('Divides') ||
                this.match('Modulus')) &&
            // exclude compund assignment operators
            this._tokens[this.current + 1].type !== 'Equals'
        ) {
            const operator = this.token().value
            this.ingest()
            const right = this.parsePrimary()
            left = new BinaryExpression(operator, left, right)
        }

        return left
    }

    private parsePrimary(): Statement {
        const token = this.token()

        switch (token.type) {
            case 'NumericLiteral':
                this.ingest()
                return new Literal(+token.value, token.value)
            case 'StringLiteral':
                this.ingest()
                return new Literal(token.value, token.value)
            case 'BooleanLiteral':
                this.ingest()
                return new Literal(token.value === 'true', token.value)
            case 'Null':
                this.ingest()
                return new Literal(null, token.value)
            case 'Undefined':
                this.ingest()
                return new Literal(undefined, token.value)
            case 'Identifier':
                this.ingest()
                return new Identifier(token.value)
            case 'OpenParen':
                this.ingest()
                return this.parseOpenParens()
            case 'Return':
                this.ingest()
                return this.parseReturnStatement()
            default:
                throw new Error(`Unexpected token: ${token.type}`)
        }
    }

    private parseOpenParens(): Statement {
        const statement = this.parseExpression()
        if (this.token().type !== 'CloseParen') {
            throw new SyntaxError('Expected closing parenthesis')
        }
        this.ingest()
        return statement
    }

    private parseVariableDeclaration(
        type: Extract<TokenType, 'Let' | 'Const' | 'Var'>
    ): VariableDeclaration {
        const kind = type.toLowerCase() as 'let' | 'const' | 'var'

        this.ingest()

        if (this.token().type !== 'Identifier') {
            throw new SyntaxError(
                `Cannot declare a variable without an identifier`
            )
        }

        const id = new Identifier(this.token().value)

        this.ingest()

        // no we need a lookahead if there is a semicolon to terminate the statement
        if (this.token().type === 'Semicolon') {
            if (kind === 'const') {
                console.error(
                    'Cannot declare a constant without a value: ',
                    this.token().value
                )
                throw new SyntaxError(
                    'Cannot declare a constant without a value'
                )
            }

            return new VariableDeclaration(id, undefined, kind)
        }

        if (this.token().type !== 'Equals') {
            console.error('Expected Equals but got: ', this.token().type)
            throw new TypeError(this.token().type)
        }

        // we know that the right side of the equals sign is the value
        // which can be an expression, literal, identifier, or undefined
        this.ingest()

        const init = this.parseExpression()

        return new VariableDeclaration(
            id,
            init,
            type.toLowerCase() as 'let' | 'const' | 'var'
        )
    }

    private parseReturnStatement(): Statement {
        const expression = this.parseExpression()
        return new ReturnStatement(expression)
    }

    private parseFunctionDeclaration(): FunctionDeclaration {
        this.ingest()

        if (this.token().type !== 'Identifier') {
            throw new SyntaxError(
                `Expected Identifier but got: ${this.token().type}`
            )
        }

        const id = new Identifier(this.token().value)

        this.ingest()

        if (this.token().type !== 'OpenParen') {
            throw new SyntaxError(
                `Expected OpenParen but got: ${this.token().type}`
            )
        }

        const args: Identifier[] = []

        this.ingest()
        while (this.token().type !== 'CloseParen') {
            if (this.token().type === 'EOF') {
                throw new SyntaxError(
                    `Expected CloseParen but got: ${this.token().type}`
                )
            }

            if (this.token().type === 'Identifier') {
                args.push(new Identifier(this.token().value))
            } else if (this.token().type !== 'Comma') {
                throw new SyntaxError(
                    `Invalid Argument Syntax: expected Identifier or Comma but got: ${this.token().type}`
                )
            }

            this.ingest()
        }

        this.ingest()

        if (this.token().type !== 'OpenBrace') {
            throw new SyntaxError(
                `Expected OpenBrace but got: ${this.token().type}`
            )
        }

        this.ingest()

        const block = new BlockStatement([])

        while (this.token().type !== 'CloseBrace') {
            if (this.token().type === 'EOF') {
                throw new SyntaxError(
                    `Expected CloseBrace but got: ${this.token().type}`
                )
            }
            const node = this.parseExpression()

            if (node != null) {
                block.body.push(node)
            }
        }

        return new FunctionDeclaration(id, args, block)
    }
}
