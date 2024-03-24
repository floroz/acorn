
export type Token = {
    type: TokenType
    value: string
}

export const SPECIAL_CHAR_DICTIONARY
    : Record<SpecialCharacters, TokenType> = {
        '(': 'OpenParent',
        ')': 'CloseParent',
        '=': 'Equals',
        '+': 'Adds',
        '-': 'Subtracts',
        '*': 'Multiplies',
        '/': 'Divides',
        '%': 'Modulus',
        ';': 'EndOfLine',
        '{': 'OpenBrace',
        '}': 'CloseBrace',
        '[': 'OpenSquareBracket',
        ']': 'CloseSquareBracket',
        ",": 'Comma',
        "=>": "ArrowFunction",
    } as const;

export type Operators = '+' | '-' | '*' | '/' | '%'
export type Parenthesis = '(' | ')'
export type SquareBrackets = '[' | ']'
export type Braces = '{' | '}'
export type Comma = ','
export type Equals = '='
export type EndOfLine = ';'
export type ArrowFunction = "=>"

export type SpecialCharacters = Parenthesis | Operators | Braces | Comma | ArrowFunction | SquareBrackets | Equals | EndOfLine

export type TokenType =
    | 'Number'
    | 'Identifier'
    | 'Equals'
    | 'Adds'
    | 'Subtracts'
    | 'Multiplies'
    | 'Divides'
    | 'Modulus'
    | 'EndOfLine'
    | 'OpenParent'
    | 'CloseParent'
    | 'OpenBrace'
    | 'CloseBrace'
    | 'OpenSquareBracket'
    | 'CloseSquareBracket'
    | 'Comma'
    | 'ArrowFunction'
    | "EOF"
    | (typeof RESERVED_KEYWORDS_DICTIONARY)[keyof typeof RESERVED_KEYWORDS_DICTIONARY]

    export const RESERVED_KEYWORDS_DICTIONARY = {
    abstract: 'Abstract',
    as: 'As',
    async: 'Async',
    await: 'Await',
    break: 'Break',
    case: 'Case',
    catch: 'Catch',
    class: 'Class',
    console: 'Console',
    const: 'Const',
    continue: 'Continue',
    debugger: 'Debugger',
    default: 'Default',
    delete: 'Delete',
    do: 'Do',
    document: 'Document',
    else: 'Else',
    enum: 'Enum',
    export: 'Export',
    extends: 'Extends',
    false: 'False',
    final: 'Final',
    finally: 'Finally',
    for: 'For',
    from: 'From',
    function: 'Function',
    global: 'Global',
    history: 'History',
    if: 'If',
    implements: 'Implements',
    import: 'Import',
    in: 'In',
    instanceof: 'Instanceof',
    interface: 'Interface',
    is: 'Is',
    let: 'Let',
    location: 'Location',
    module: 'Module',
    namespace: 'Namespace',
    navigator: 'Navigator',
    new: 'New',
    null: 'Null',
    private: 'Private',
    process: 'Process',
    protected: 'Protected',
    public: 'Public',
    readonly: 'Readonly',
    require: 'Require',
    return: 'Return',
    screen: 'Screen',
    static: 'Static',
    super: 'Super',
    switch: 'Switch',
    this: 'This',
    throw: 'Throw',
    true: 'True',
    try: 'Try',
    type: 'Type',
    typeof: 'Typeof',
    undefined: 'Undefined',
    var: 'Var',
    void: 'Void',
    while: 'While',
    window: 'Window',
    with: 'With',
    yield: 'Yield',
} as const