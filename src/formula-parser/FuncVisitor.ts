import {tokenMatcher} from "chevrotain";
import BaseCstVisitor from "./BaseCstVisitor";
import * as Tokens from "./tokens";

enum AdditionOperator {
    Plus,
    Minus,
}

enum MultiplicationOperator {
    Multiply,
    Divide,
}

export default class FormulaVisitor extends BaseCstVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    expression(ctx: any): (x: number) => number {
        if (ctx.additionExpression) {
            return this.visit(ctx.additionExpression);
        } else if (ctx.children.additionExpression) {
            return this.visit(ctx.children.additionExpression);
        } else {
            throw Error("unreachable code");
        }
    }

    additionExpression(ctx: any): (x: number) => number {
        const funcs: Array<(x: number) => number> = [this.visit(ctx.leftSide)];
        const operators: AdditionOperator[] = [];
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                funcs.push(this.visit(rightSideOperand));
                const operator = ctx.AdditionOperator[idx];
                if (tokenMatcher(operator, Tokens.Plus)) {
                    operators.push(AdditionOperator.Plus);
                } else if (tokenMatcher(operator, Tokens.Minus)) {
                    operators.push(AdditionOperator.Minus);
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
            });
        }
        return (x: number) => {
            const values: number[] = funcs.map((func: (x: number) => number) => {
                return func(x);
            });
            return values.reduce((a: number, b: number, idx) => {
                const operator: AdditionOperator = operators[idx - 1];
                switch (operator) {
                    case AdditionOperator.Plus:
                        return a + b;
                    case AdditionOperator.Minus:
                        return a - b;
                    default:
                        throw new Error(`unknown operator ${operator}`);
                }
            });
        };
    }

    multiplicationExpression(ctx: any) {
        const funcs: Array<(x: number) => number> = [this.visit(ctx.leftSide)];
        const operators: MultiplicationOperator[] = [];
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                funcs.push(this.visit(rightSideOperand));
                const operator = ctx.MultiplicationOperator[idx];
                if (tokenMatcher(operator, Tokens.Multiply)) {
                    operators.push(MultiplicationOperator.Multiply);
                } else if (tokenMatcher(operator, Tokens.Divide)) {
                    operators.push(MultiplicationOperator.Divide);
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
            });
        }
        return (x: number) => {
            const values: number[] = funcs.map((func: (x: number) => number) => {
                return func(x);
            });
            return values.reduce((a: number, b: number, idx) => {
                const operator: MultiplicationOperator = operators[idx - 1];
                switch (operator) {
                    case MultiplicationOperator.Multiply:
                        return a * b;
                    case MultiplicationOperator.Divide:
                        return a / b;
                    default:
                        throw new Error(`unknown operator ${operator}`);
                }
            });
        };
    }

    parenthesisExpression(ctx: any): (x: number) => number {
        return this.visit(ctx.expression);
    }

    atomicExpression(ctx: any): (x: number) => number {
        if (ctx.X) {
            return (x: number) => x;
        } else if (ctx.NumberLiteral) {
            return (x: number) => parseInt(ctx.NumberLiteral[0].image, 10);
        } else if (ctx.parenthesisExpression) {
            return this.visit(ctx.parenthesisExpression);
        } else {
            throw Error("unreachable code");
        }
    }

}
