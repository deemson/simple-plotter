import {tokenMatcher} from "chevrotain";
import FormulaParser from "./FormulaParser";
import * as Tokens from "./tokens";

const formulaParser = new FormulaParser([]);
const BaseCstVisitor = formulaParser.getBaseCstVisitorConstructor();

export default class FormulaVisitor extends BaseCstVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    expression(ctx: any, x: number): number {
        return this.visit(ctx.children.additionExpression, x);
    }

    additionExpression(ctx: any, x: number) {
        let result = this.visit(ctx.leftSide, x);
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                const rightSideValue = this.visit(rightSideOperand);
                const operator = ctx.AdditionOperator[idx];
                if (tokenMatcher(operator, Tokens.Plus)) {
                    result += rightSideValue;
                } else if (tokenMatcher(operator, Tokens.Minus)) {
                    result -= rightSideValue;
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
            });
        }
        return result;
    }

    multiplicationExpression(ctx: any, x: number) {
        let result = this.visit(ctx.leftSide, x);
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                const rightSideValue = this.visit(rightSideOperand);
                const operator = ctx.MultiplicationOperator[idx];
                if (tokenMatcher(operator, Tokens.Multiply)) {
                    result *= rightSideValue;
                } else if (tokenMatcher(operator, Tokens.Divide)) {
                    result /= rightSideValue;
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
            });
        }
        return result;
    }

    atomicExpression(ctx: any, x: number) {
        return parseInt(ctx.NumberLiteral[0].image, 10);
    }

}
