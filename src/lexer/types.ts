import { RESERVED_KEYWORDS_DICTIONARY } from './reserved-keywords'

export type Token = {
    type: TokenType
    value: string
}

export type TokenType =
    | 'Number'
    | 'Identifier'
    | 'Equals'
    | 'Adds'
    | 'Subtracts'
    | 'Multiplies'
    | 'Divides'
    | 'OpenParent'
    | 'CloseParent'
    | (typeof RESERVED_KEYWORDS_DICTIONARY)[keyof typeof RESERVED_KEYWORDS_DICTIONARY]
