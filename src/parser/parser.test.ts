import { it, describe, expect } from 'vitest'
import { Parser } from './parser'

describe('Parser', () => {
    describe('Literals', () => {
        it('should parse all primitives as literals', () => {
            expect(new Parser('true').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "true",
                    "type": "Literal",
                    "value": true,
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('false').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "false",
                    "type": "Literal",
                    "value": false,
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('null').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "null",
                    "type": "Literal",
                    "value": null,
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('undefined').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "undefined",
                    "type": "Literal",
                    "value": undefined,
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('1').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "1",
                    "type": "Literal",
                    "value": 1,
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('"hello"').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Literal {
                    "raw": "hello",
                    "type": "Literal",
                    "value": "hello",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser('x').toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  Identifier {
                    "name": "x",
                    "type": "Identifier",
                  },
                ],
                "type": "Program",
              }
            `)
        })
    })

    describe.skip('Variable Declarations', () => {
        it('should parse a the let variable declaration of an identifier', () => {
            const source = `let x = y`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Identifier {
                "name": "y",
                "type": "Identifier",
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })

        it('should parse a the let variable declaration of a literal', () => {
            const source = `let x = 1`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Literal {
                "raw": "1",
                "type": "Literal",
                "value": 1,
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })

        it('should parse a the let variable declaration of a string', () => {
            const source = `let x = "hello"`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Literal {
                "raw": "hello",
                "type": "Literal",
                "value": "hello",
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })

        it('should parse a the let variable declaration of a boolean', () => {
            const source = `let x = true`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Literal {
                "raw": "true",
                "type": "Literal",
                "value": true,
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })

        it('should parse a the let variable declaration of a null', () => {
            const source = `let x = null`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Literal {
                "raw": "null",
                "type": "Literal",
                "value": null,
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })

        it('should parse a the let variable declaration of an undefined', () => {
            const source = `let x = undefined`

            const parser = new Parser(source)

            const result = parser.toAST()

            expect(result).toMatchInlineSnapshot(`
        Program {
          "body": [
            VariableDeclaration {
              "id": Identifier {
                "name": "x",
                "type": "Identifier",
              },
              "init": Literal {
                "raw": "undefined",
                "type": "Literal",
                "value": undefined,
              },
              "kind": "let",
              "type": "VariableDeclaration",
            },
          ],
          "type": "Program",
        }
      `)
        })
    })

    describe('Binary Expressions', () => {
        it('should parse an additive binary expression', () => {
            expect(new Parser(`1 + 2`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "operator": "+",
                    "right": Literal {
                      "raw": "2",
                      "type": "Literal",
                      "value": 2,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a subtractive binary expression', () => {
            expect(new Parser(`1 - 2`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "operator": "-",
                    "right": Literal {
                      "raw": "2",
                      "type": "Literal",
                      "value": 2,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`1 - 2 - 3`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": BinaryExpression {
                      "left": Literal {
                        "raw": "1",
                        "type": "Literal",
                        "value": 1,
                      },
                      "operator": "-",
                      "right": Literal {
                        "raw": "2",
                        "type": "Literal",
                        "value": 2,
                      },
                      "type": "BinaryExpression",
                    },
                    "operator": "-",
                    "right": Literal {
                      "raw": "3",
                      "type": "Literal",
                      "value": 3,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a multiplicative binary expression', () => {
            expect(new Parser(`1 * 2`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "operator": "*",
                    "right": Literal {
                      "raw": "2",
                      "type": "Literal",
                      "value": 2,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a division binary expression', () => {
            expect(new Parser(`1 / 2`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "operator": "/",
                    "right": Literal {
                      "raw": "2",
                      "type": "Literal",
                      "value": 2,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a modulus binary expression', () => {
            expect(new Parser(`1 % 2`).toAST()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  BinaryExpression {
                    "left": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "operator": "%",
                    "right": Literal {
                      "raw": "2",
                      "type": "Literal",
                      "value": 2,
                    },
                    "type": "BinaryExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })
    })
})
