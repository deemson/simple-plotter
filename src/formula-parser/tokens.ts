import {createToken, Lexer} from "chevrotain";

export const Whitespace = createToken({
    name: "Whitespace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
    line_breaks: true,
});
export const AdditionOperator = createToken({
    name: "AdditionOperator",
    pattern: Lexer.NA,
});
export const Plus = createToken({
    name: "Plus",
    pattern: /\+/,
    categories: AdditionOperator,
});
export const Minus = createToken({
    name: "Minus",
    pattern: /-/,
    categories: AdditionOperator,
});
export const MultiplicationOperator = createToken({
    name: "MultiplicationOperator",
    pattern: Lexer.NA,
});
export const Multiply = createToken({
    name: "Multiply",
    pattern: /\*/,
    categories: MultiplicationOperator,
});
export const Divide = createToken({
    name: "Divide",
    pattern: /\//,
    categories: MultiplicationOperator,
});
export const Power = createToken({
    name: "Power",
    pattern: /\^/,
});
export const LParen = createToken({name: "LParen", pattern: /\(/});
export const RParen = createToken({name: "RParen", pattern: /\)/});
export const X = createToken({name: "X", pattern: /x/});
export const NumberLiteral = createToken({name: "NumberLiteral", pattern: /[1-9]\d*/});
export const allTokens = [
    Whitespace,
    AdditionOperator,
    Plus,
    Minus,
    MultiplicationOperator,
    Multiply,
    Divide,
    Power,
    LParen,
    RParen,
    X,
    NumberLiteral,
];
