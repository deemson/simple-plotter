import {tokenMatcher} from "chevrotain";
import BaseCstVisitor from "./BaseCstVisitor";
import * as Tokens from "./tokens";

export default class MathJaxVisitor extends BaseCstVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    expression(ctx: any): string {
        if (ctx.additionExpression) {
            return this.visit(ctx.additionExpression);
        } else if (ctx.children.additionExpression) {
            return this.visit(ctx.children.additionExpression);
        } else {
            throw Error("unreachable code");
        }
    }

    additionExpression(ctx: any): string {
        const result: string[] = [this.visit(ctx.leftSide)];
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                const operator = ctx.AdditionOperator[idx];
                if (tokenMatcher(operator, Tokens.Plus)) {
                    result.push("+");
                } else if (tokenMatcher(operator, Tokens.Minus)) {
                    result.push("-");
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
                result.push(this.visit(rightSideOperand));
            });
        }
        return result.join("");
    }

    multiplicationExpression(ctx: any): string {
        const result: string[] = [this.visit(ctx.leftSide)];
        if (ctx.rightSide) {
            ctx.rightSide.forEach((rightSideOperand: any, idx: number) => {
                const operator = ctx.MultiplicationOperator[idx];
                if (tokenMatcher(operator, Tokens.Multiply)) {
                    result.push("*");
                } else if (tokenMatcher(operator, Tokens.Divide)) {
                    result.push("/");
                } else {
                    throw new Error(`unknown operator ${operator}`);
                }
                result.push(this.visit(rightSideOperand));
            });
        }
        return result.join("");
    }

    parenthesisExpression(ctx: any): string {
        return `(${this.visit(ctx.expression)})`;
    }

    atomicExpression(ctx: any): string {
        if (ctx.X) {
            return "x";
        } else if (ctx.NumberLiteral) {
            return ctx.NumberLiteral[0].image;
        } else if (ctx.parenthesisExpression) {
            return this.visit(ctx.parenthesisExpression);
        } else {
            throw Error("unreachable code");
        }
    }
}
