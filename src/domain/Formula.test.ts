import Formula from "./Formula";

describe("calculate(x)", () => {
    it("should calculate scalar plus/minus", () => {
        const formula = new Formula();
        formula.consume("150 + 25 - 7");
        expect(formula.errors).toEqual([]);
        expect(formula.calculate()).toBe(150 + 25 - 7);
    });
    it("should calculate scalar multiply/divide", () => {
        const formula = new Formula();
        formula.consume("7 * 4 / 2");
        expect(formula.errors).toEqual([]);
        expect(formula.calculate()).toBe(7 * 4 / 2);
    });
    it("should calculate scalar with parenthesis", () => {
        const formula = new Formula();
        formula.consume("(11 + 7) * 2");
        expect(formula.errors).toEqual([]);
        expect(formula.calculate()).toBe((11 + 7) * 2);
    });
    it("should calculate simple formula", () => {
        const formula = new Formula();
        formula.consume("2 * x + 3");
        expect(formula.errors).toEqual([]);
        expect(formula.calculate(2)).toBe(2 * 2 + 3);
        expect(formula.calculate(3)).toBe(2 * 3 + 3);
    });
    it("should calculate quadratic formula", () => {
        const formula = new Formula();
        formula.consume("x * x + 3 * x + 5");
        expect(formula.errors).toEqual([]);
        expect(formula.calculate(2)).toBe(2 * 2 + 3 * 2 + 5);
        expect(formula.calculate(5)).toBe(5 * 5 + 3 * 5 + 5);
    });
});

describe("render()", () => {
    it("should render basic formula", () => {
        const formula = new Formula();
        formula.consume("(x + 3) * 3 + 5");
        expect(formula.errors).toEqual([]);
        expect(formula.render()).toBe("(x+3)*3+5");
    });
});
