
export type NodeType = "Program" | "NumericLiteral" | "Identifier" | "BinaryExpression" | "UnaryExpression" | "AssignmentExpression" | "CallExpression" | "FunctionDeclaration" | "VariableDeclaration" | "IfStatement" | "WhileStatement" | "ForStatement" | "ReturnStatement" | "BlockStatement";

abstract class Statement {
  constructor(public type: NodeType) {
    }
}

export class Program extends Statement {
  constructor(public body: Statement[]){
    super("Program")
  }
}

export class NumericLiteral extends Statement {
  constructor(public value: number) {
    super("NumericLiteral")
  }
}

export class Identifier extends Statement {
  constructor(public name: string){
    super("Identifier")
  }
}

export class BinaryExpression extends Statement {
  constructor(
    public operator: string,
    public left: Statement,
    public right: Statement
  ){
    super("BinaryExpression")
  }
}

export class UnaryExpression extends Statement {
  constructor(
    public operator: string,
    public argument: Statement
  ){
    super("UnaryExpression")
  }
}

export class AssignmentExpression extends Statement {
  constructor(
    public operator: string,
    public left: Statement,
    public right: Statement
  ){
    super("AssignmentExpression")
  }
}

export class CallExpression extends Statement {
  constructor(
    public callee: Statement,
    public args: Statement[]
  ){
    super("CallExpression")
  }
}

export class FunctionDeclaration extends Statement {
  constructor(
    public id: Statement,
    public params: Statement[],
    public body: Statement
  ){
    super("FunctionDeclaration")
  }
}

export class VariableDeclaration extends Statement {
  constructor(
    public id: Statement,
    public init: Statement
  ){
    super("VariableDeclaration")
  }
}

export class IfStatement extends Statement {
  constructor(
    public test: Statement,
    public consequent: Statement,
    public alternate: Statement
  ){
    super("IfStatement")
  }
}

export class WhileStatement extends Statement {
  constructor(
    public test: Statement,
    public body: Statement
  ){
    super("WhileStatement")
  }
  
}

export class ForStatement extends Statement {
  constructor(
    public init: Statement,
    public test: Statement,
    public update: Statement,
    public body: Statement
  ){
    super("ForStatement")
  } 
}

export class ReturnStatement extends Statement {
  constructor(
    public argument: Statement
  ){
    super("ReturnStatement")
  }
}

export class BlockStatement extends Statement {
  constructor(
    public body: Statement[]
  ){
    super("BlockStatement")
  }
}

