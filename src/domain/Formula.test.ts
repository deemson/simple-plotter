import Formula from "./Formula";

describe("Formula", () => {
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
});
