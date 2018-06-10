import {IToken, Parser} from "chevrotain";
import * as Tokens from "./tokens";

export default class FormulaParser extends Parser {
    expression = this.RULE("expression", () => {
        this.SUBRULE(this.additionExpression);
    });

    additionExpression = this.RULE("additionExpression", () => {
        this.SUBRULE(this.multiplicationExpression, {LABEL: "leftSide"});
        this.MANY(() => {
            this.CONSUME(Tokens.AdditionOperator);
            this.SUBRULE2(this.multiplicationExpression, {LABEL: "rightSide"});
        });
    });

    multiplicationExpression = this.RULE("multiplicationExpression", () => {
        this.SUBRULE(this.atomicExpression, {LABEL: "leftSide"});
        this.MANY(() => {
            this.CONSUME(Tokens.MultiplicationOperator);
            this.SUBRULE2(this.atomicExpression, {LABEL: "rightSide"});
        });
    });

    atomicExpression = this.RULE("atomicExpression", () => {
        this.CONSUME(Tokens.NumberLiteral);
    });

    constructor(input: IToken[]) {
        super(input, Tokens.allTokens, {outputCst: true});
        this.performSelfAnalysis();
    }
}
