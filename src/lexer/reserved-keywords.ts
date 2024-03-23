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

export const ReservedKeywordsMap = new Map(
    Object.entries(RESERVED_KEYWORDS_DICTIONARY)
)
