
export type NodeType = "Program" | "NumericLiteral" | "Identifier" | "BinaryExpression" | "UnaryExpression" | "AssignmentExpression" | "CallExpression" | "FunctionDeclaration" | "VariableDeclaration" | "IfStatement" | "WhileStatement" | "ForStatement" | "ReturnStatement" | "BlockStatement";

export interface Statement {
    type: NodeType
}

export interface Program extends Statement {
    type: "Program"
    body: Statement[]
}

export interface NumericLiteral extends Statement {
    type: "NumericLiteral"
    value: number
}

export interface Identifier extends Statement {
    type: "Identifier"
    name: string
}

export interface BinaryExpression extends Statement {
    type: "BinaryExpression"
  operator: string;
    left: Statement
    right: Statement
}

export interface UnaryExpression extends Statement {
    type: "UnaryExpression"
    operator: string
    argument: Statement
}

export interface AssignmentExpression extends Statement {
    type: "AssignmentExpression"
    operator: string
    left: Statement
    right: Statement
}

export interface CallExpression extends Statement {
    type: "CallExpression"
    callee: Statement
    arguments: Statement[]
}

export interface FunctionDeclaration extends Statement {
    type: "FunctionDeclaration"
    id: Statement
    params: Statement[]
    body: Statement
}

export interface VariableDeclaration extends Statement {
    type: "VariableDeclaration"
    id: Statement
    init: Statement
}

export interface IfStatement extends Statement {
    type: "IfStatement"
    test: Statement
    consequent: Statement
    alternate: Statement
}

export interface WhileStatement extends Statement {
    type: "WhileStatement"
    test: Statement
    body: Statement
}

export interface ForStatement extends Statement {
    type: "ForStatement"
    init: Statement
    test: Statement
    update: Statement
    body: Statement
}

export interface ReturnStatement extends Statement {
    type: "ReturnStatement"
    argument: Statement
}

export interface BlockStatement extends Statement {
    type: "BlockStatement"
    body: Statement[]
}

