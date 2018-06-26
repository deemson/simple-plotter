import {ILexingResult, Lexer} from "chevrotain";
import {FormulaParser, FormulaVisitor, Tokens} from "../formula-parser";

export default class Formula {
    errors: any;
    private lexer: Lexer;
    private lexingResult: ILexingResult;
    private parser: FormulaParser;
    private cst: any;
    private visitor: FormulaVisitor;
    private func: (x: number) => number;

    constructor() {
        this.lexer = new Lexer(Tokens.allTokens);
        this.parser = new FormulaParser([]);
        this.visitor = new FormulaVisitor();
    }

    consume(text: string) {
        this.tokenize(text);
        this.parse();
        this.func = this.visitor.expression(this.cst);
    }

    calculate(x?: number): number {
        return this.func(x);
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
