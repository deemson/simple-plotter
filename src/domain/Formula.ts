import {ILexingResult, Lexer} from "chevrotain";
import {FormulaParser, FormulaVisitor, Tokens} from "../formula-parser";

export default class Formula {
    errors: any;
    private lexer: Lexer;
    private lexingResult: ILexingResult;
    private parser: FormulaParser;
    private cst: any;
    private visitor: FormulaVisitor;

    constructor() {
        this.lexer = new Lexer(Tokens.allTokens);
        this.parser = new FormulaParser([]);
        this.visitor = new FormulaVisitor();
    }

    consume(text: string) {
        this.tokenize(text);
        this.parse();
    }

    calculate(x?: number): number {
        return this.visitor.expression(this.cst, x);
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
