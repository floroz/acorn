import { it, describe, expect } from 'vitest'
import { Parser } from './parser'

describe('Parser', () => {
    describe('Literals', () => {
        it('should parse all primitives as literals', () => {
            expect(new Parser('true').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('false').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('null').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('undefined').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('1').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('"hello"').parse()).toMatchInlineSnapshot(`
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

            expect(new Parser('x').parse()).toMatchInlineSnapshot(`
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

    describe('Binary Expressions', () => {
        it('should parse an additive binary expression', () => {
            expect(new Parser(`1 + 2`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`1 - 2`).parse()).toMatchInlineSnapshot(`
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

            expect(new Parser(`1 - 2 - 3`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`1 * 2`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`1 / 2`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`1 % 2`).parse()).toMatchInlineSnapshot(`
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

    describe('Assignment Expressions', () => {
        it('should parse an assignment expression', () => {
            expect(new Parser(`x = 1`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  AssignmentExpression {
                    "left": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "operator": "=",
                    "right": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "type": "AssignmentExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a compound assignment expression', () => {
            expect(new Parser(`x += 1`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  AssignmentExpression {
                    "left": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "operator": "+=",
                    "right": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "type": "AssignmentExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`x -= 1`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  AssignmentExpression {
                    "left": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "operator": "-=",
                    "right": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "type": "AssignmentExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`x *= 1`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  AssignmentExpression {
                    "left": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "operator": "*=",
                    "right": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "type": "AssignmentExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`x /= 1`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  AssignmentExpression {
                    "left": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "operator": "/=",
                    "right": Literal {
                      "raw": "1",
                      "type": "Literal",
                      "value": 1,
                    },
                    "type": "AssignmentExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })
    })

    describe('Variable Declarations', () => {
        it('should parse an uninitialized declaration', () => {
            expect(new Parser(`let x;`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  VariableDeclaration {
                    "id": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "init": undefined,
                    "kind": "let",
                    "type": "VariableDeclaration",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`var x;`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  VariableDeclaration {
                    "id": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "init": undefined,
                    "kind": "var",
                    "type": "VariableDeclaration",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(() =>
                new Parser(`const x;`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Cannot declare a constant without a value]`
            )
        })

        it('should parse a the let variable declaration of an identifier', () => {
            expect(new Parser(`let x = y`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`let x = 1`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`let x = "hello"`).parse())
                .toMatchInlineSnapshot(`
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
            expect(new Parser(`let x = true`).parse()).toMatchInlineSnapshot(`
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
            expect(new Parser(`let x = null`).parse()).toMatchInlineSnapshot(`
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

            const result = parser.parse()

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

        it('should throw when the variable keyword is declared without nothing else', () => {
            expect(() =>
                new Parser(`let`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Cannot declare a variable without an identifier]`
            )

            expect(() =>
                new Parser(`var`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Cannot declare a variable without an identifier]`
            )

            expect(() =>
                new Parser(`const`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Cannot declare a variable without an identifier]`
            )
        })

        it('should support variable declarations of objects', () => {
            expect(new Parser(`let x = { y: 1 }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  VariableDeclaration {
                    "id": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "init": ObjectExpression {
                      "properties": [
                        Property {
                          "key": Identifier {
                            "name": "y",
                            "type": "Identifier",
                          },
                          "type": "Property",
                          "value": Literal {
                            "raw": "1",
                            "type": "Literal",
                            "value": 1,
                          },
                        },
                      ],
                      "type": "ObjectExpression",
                    },
                    "kind": "let",
                    "type": "VariableDeclaration",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`const x = { y: { z: 1 } }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  VariableDeclaration {
                    "id": Identifier {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "init": ObjectExpression {
                      "properties": [
                        Property {
                          "key": Identifier {
                            "name": "y",
                            "type": "Identifier",
                          },
                          "type": "Property",
                          "value": ObjectExpression {
                            "properties": [
                              Property {
                                "key": Identifier {
                                  "name": "z",
                                  "type": "Identifier",
                                },
                                "type": "Property",
                                "value": Literal {
                                  "raw": "1",
                                  "type": "Literal",
                                  "value": 1,
                                },
                              },
                            ],
                            "type": "ObjectExpression",
                          },
                        },
                      ],
                      "type": "ObjectExpression",
                    },
                    "kind": "const",
                    "type": "VariableDeclaration",
                  },
                ],
                "type": "Program",
              }
            `)
        })
    })

    describe('Function Declarations', () => {
        it('should parse a function declaration', () => {
            expect(new Parser(`function add(a, b) { return a + b }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  FunctionDeclaration {
                    "body": BlockStatement {
                      "body": [
                        ReturnStatement {
                          "argument": BinaryExpression {
                            "left": Identifier {
                              "name": "a",
                              "type": "Identifier",
                            },
                            "operator": "+",
                            "right": Identifier {
                              "name": "b",
                              "type": "Identifier",
                            },
                            "type": "BinaryExpression",
                          },
                          "type": "ReturnStatement",
                        },
                      ],
                      "type": "BlockStatement",
                    },
                    "id": Identifier {
                      "name": "add",
                      "type": "Identifier",
                    },
                    "params": [
                      Identifier {
                        "name": "a",
                        "type": "Identifier",
                      },
                      Identifier {
                        "name": "b",
                        "type": "Identifier",
                      },
                    ],
                    "type": "FunctionDeclaration",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should throw when the function declaration syntax is not correct', () => {
            expect(() =>
                new Parser(`function`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Expected Identifier but got: EOF]`
            )

            expect(() =>
                new Parser(`function add`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Expected OpenParen but got: EOF]`
            )

            expect(() =>
                new Parser(`function () {}`).parse()
            ).toThrowErrorMatchingInlineSnapshot(
                `[SyntaxError: Expected Identifier but got: OpenParen]`
            )

            expect(() => new Parser(`function add() {}`).parse()).not.toThrow()
        })
    })

    describe('Object Expressions', () => {
        it('should parse a simple object expression', () => {
            expect(new Parser(`{}`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`{ x: 1 }`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": Literal {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1,
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)

            expect(new Parser(`{ x: 1, y: 2 }`).parse()).toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": Literal {
                          "raw": "1",
                          "type": "Literal",
                          "value": 1,
                        },
                      },
                      Property {
                        "key": Identifier {
                          "name": "y",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": Literal {
                          "raw": "2",
                          "type": "Literal",
                          "value": 2,
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a nested object expression', () => {
            expect(new Parser(`{ x: { y: 1 } }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": ObjectExpression {
                          "properties": [
                            Property {
                              "key": Identifier {
                                "name": "y",
                                "type": "Identifier",
                              },
                              "type": "Property",
                              "value": Literal {
                                "raw": "1",
                                "type": "Literal",
                                "value": 1,
                              },
                            },
                          ],
                          "type": "ObjectExpression",
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a nested object expression with multiple properties', () => {
            expect(new Parser(`{ x: { y: 1, z: 2 } }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": ObjectExpression {
                          "properties": [
                            Property {
                              "key": Identifier {
                                "name": "y",
                                "type": "Identifier",
                              },
                              "type": "Property",
                              "value": Literal {
                                "raw": "1",
                                "type": "Literal",
                                "value": 1,
                              },
                            },
                            Property {
                              "key": Identifier {
                                "name": "z",
                                "type": "Identifier",
                              },
                              "type": "Property",
                              "value": Literal {
                                "raw": "2",
                                "type": "Literal",
                                "value": 2,
                              },
                            },
                          ],
                          "type": "ObjectExpression",
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a nested object expression with a nested object', () => {
            expect(new Parser(`{ x: { y: { z: 1 } } }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": ObjectExpression {
                          "properties": [
                            Property {
                              "key": Identifier {
                                "name": "y",
                                "type": "Identifier",
                              },
                              "type": "Property",
                              "value": ObjectExpression {
                                "properties": [
                                  Property {
                                    "key": Identifier {
                                      "name": "z",
                                      "type": "Identifier",
                                    },
                                    "type": "Property",
                                    "value": Literal {
                                      "raw": "1",
                                      "type": "Literal",
                                      "value": 1,
                                    },
                                  },
                                ],
                                "type": "ObjectExpression",
                              },
                            },
                          ],
                          "type": "ObjectExpression",
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })

        it('should parse a nested object expression with a nested object with multiple properties', () => {
            expect(new Parser(`{ x: { y: { z: 1, w: 2 } } }`).parse())
                .toMatchInlineSnapshot(`
              Program {
                "body": [
                  ObjectExpression {
                    "properties": [
                      Property {
                        "key": Identifier {
                          "name": "x",
                          "type": "Identifier",
                        },
                        "type": "Property",
                        "value": ObjectExpression {
                          "properties": [
                            Property {
                              "key": Identifier {
                                "name": "y",
                                "type": "Identifier",
                              },
                              "type": "Property",
                              "value": ObjectExpression {
                                "properties": [
                                  Property {
                                    "key": Identifier {
                                      "name": "z",
                                      "type": "Identifier",
                                    },
                                    "type": "Property",
                                    "value": Literal {
                                      "raw": "1",
                                      "type": "Literal",
                                      "value": 1,
                                    },
                                  },
                                  Property {
                                    "key": Identifier {
                                      "name": "w",
                                      "type": "Identifier",
                                    },
                                    "type": "Property",
                                    "value": Literal {
                                      "raw": "2",
                                      "type": "Literal",
                                      "value": 2,
                                    },
                                  },
                                ],
                                "type": "ObjectExpression",
                              },
                            },
                          ],
                          "type": "ObjectExpression",
                        },
                      },
                    ],
                    "type": "ObjectExpression",
                  },
                ],
                "type": "Program",
              }
            `)
        })
    })
})
