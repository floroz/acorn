import { it, describe, expect } from 'vitest'

import { Tokenizer } from './lexer'

describe('Tokenizer', () => {
    it('should tokenize arrow function', () => {
        const source = ' => '
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "ArrowFunction",
              "value": "=>",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize equals', () => {
        const source = '='
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Equals",
              "value": "=",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize special characters', () => {
        const source = '+ - * / %'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Adds",
              "value": "+",
            },
            {
              "type": "Subtracts",
              "value": "-",
            },
            {
              "type": "Multiplies",
              "value": "*",
            },
            {
              "type": "Divides",
              "value": "/",
            },
            {
              "type": "Modulus",
              "value": "%",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should skip skippable characters', () => {
        const source = '   '
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source2 = '\n\t;'
        expect(new Tokenizer(source2).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source3 = ' ;  '
        expect(new Tokenizer(source3).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize numeric literals', () => {
        const source = '123'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source1 = '1 2 3'
        expect(new Tokenizer(source1).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "1",
            },
            {
              "type": "NumericLiteral",
              "value": "2",
            },
            {
              "type": "NumericLiteral",
              "value": "3",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source2 = '123.456'
        expect(new Tokenizer(source2).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123.456",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source3 = '123e4'
        expect(new Tokenizer(source3).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123e4",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source4 = '123E4'
        expect(new Tokenizer(source4).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123E4",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source5 = '123e+4'
        expect(new Tokenizer(source5).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123e+4",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source6 = '123e-4'
        expect(new Tokenizer(source6).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123e-4",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source7 = '123.456e+4'
        expect(new Tokenizer(source7).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123.456e+4",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
        const source8 = '123_456'
        expect(new Tokenizer(source8).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "NumericLiteral",
              "value": "123_456",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize reserved keywords', () => {
        const source = 'if'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "If",
              "value": "if",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)

        const source2 = 'else'

        expect(new Tokenizer(source2).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Else",
              "value": "else",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)

        const source3 = 'else if'

        expect(new Tokenizer(source3).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Else",
              "value": "else",
            },
            {
              "type": "If",
              "value": "if",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize boolean literals', () => {
        const source = 'true false'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "BooleanLiteral",
              "value": "true",
            },
            {
              "type": "BooleanLiteral",
              "value": "false",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize identifiers', () => {
        const source = 'foo bar'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Identifier",
              "value": "foo",
            },
            {
              "type": "Identifier",
              "value": "bar",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should tokenize string literals', () => {
        const source = '"hello" \'world\''
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "StringLiteral",
              "value": "hello",
            },
            {
              "type": "StringLiteral",
              "value": "world",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
    it('should throw error for unrecognized tokens', () => {
        const source = '@'

        expect(() => new Tokenizer(source).tokens).toThrowError(
            'Unrecognized token: @'
        )
    })
    it('should tokenize empty source', () => {
        const source = ''
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should tokenize null and undefined', () => {
        const source = 'null undefined'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Null",
              "value": "null",
            },
            {
              "type": "Undefined",
              "value": "undefined",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should tokenize comments', () => {
        const source = '// This is a comment'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should tokenize block comments', () => {
        const source = '/* This is a block comment */'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should tokenize multi line comments', () => {
        const source = `/* multi line comments
        * about stuff
        */`
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should throw error for unterminated block comments', () => {
        const source = '/* This is an unterminated block comment'
        expect(() => new Tokenizer(source).tokens).toThrowError(
            'Unterminated block comment'
        )

        const source2 = '/* This is an unterminated block comment *'
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            new Tokenizer(source2).tokens
            throw new Error('Should have thrown an error')
        } catch (error) {
            expect(error).toBeInstanceOf(SyntaxError)
        }
    })

    it('should tokenize inline comments', () => {
        const source = 'foo // This is an inline comment'
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Identifier",
              "value": "foo",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })

    it('should tokenize all together', () => {
        const source = `
        // This is a comment
        /* This is a block comment */
        foo // This is an inline comment
        123 123.456 123e4 123E4 123e+4 123e-4 123.456e+4 123_456
        true false "something" 
        null "bar" undefined
        /* multi line comments
        * about stuff
        */
        if else else if
        `
        expect(new Tokenizer(source).tokens).toMatchInlineSnapshot(`
          [
            {
              "type": "Identifier",
              "value": "foo",
            },
            {
              "type": "NumericLiteral",
              "value": "123",
            },
            {
              "type": "NumericLiteral",
              "value": "123.456",
            },
            {
              "type": "NumericLiteral",
              "value": "123e4",
            },
            {
              "type": "NumericLiteral",
              "value": "123E4",
            },
            {
              "type": "NumericLiteral",
              "value": "123e+4",
            },
            {
              "type": "NumericLiteral",
              "value": "123e-4",
            },
            {
              "type": "NumericLiteral",
              "value": "123.456e+4",
            },
            {
              "type": "NumericLiteral",
              "value": "123_456",
            },
            {
              "type": "BooleanLiteral",
              "value": "true",
            },
            {
              "type": "BooleanLiteral",
              "value": "false",
            },
            {
              "type": "StringLiteral",
              "value": "something",
            },
            {
              "type": "Null",
              "value": "null",
            },
            {
              "type": "StringLiteral",
              "value": "bar",
            },
            {
              "type": "Undefined",
              "value": "undefined",
            },
            {
              "type": "If",
              "value": "if",
            },
            {
              "type": "Else",
              "value": "else",
            },
            {
              "type": "Else",
              "value": "else",
            },
            {
              "type": "If",
              "value": "if",
            },
            {
              "type": "EOF",
              "value": "",
            },
          ]
        `)
    })
})
