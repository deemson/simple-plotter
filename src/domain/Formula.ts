import {ILexingResult, Lexer} from "chevrotain";
import {FormulaParser, FuncVisitor, MathJaxVisitor, Tokens} from "../formula-parser";

export default class Formula {
    errors: any;
    private lexer: Lexer;
    private lexingResult: ILexingResult;
    private parser: FormulaParser;
    private cst: any;

    private funcVisitor: FuncVisitor;
    private func: (x: number) => number;

    private mathJaxVisitor: MathJaxVisitor;
    private mathJaxAscii: string;

    constructor() {
        this.lexer = new Lexer(Tokens.allTokens);
        this.parser = new FormulaParser([]);
        this.funcVisitor = new FuncVisitor();
        this.mathJaxVisitor = new MathJaxVisitor();
    }

    consume(text: string) {
        this.tokenize(text);
        this.parse();
        this.func = this.funcVisitor.expression(this.cst);
        this.mathJaxAscii = this.mathJaxVisitor.expression(this.cst);
    }

    calculate(x?: number): number {
        return this.func(x);
    }

    render(): string {
        return this.mathJaxAscii;
    }

    private tokenize(text: string) {
        this.lexingResult = this.lexer.tokenize(text);
    }

    private parse() {
        this.parser.input = this.lexingResult.tokens;
        this.cst = this.parser.expression();
        this.errors = this.parser.errors;
    }

}
