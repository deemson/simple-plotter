import {Lexer} from "chevrotain";
import * as Tokens from "./tokens";

it("should read all tokens", () => {
    const lexer = new Lexer(Tokens.allTokens);
    const res = lexer.tokenize("(123x + 5) * x^3 / 2");
    expect(res.tokens.length).toBeGreaterThan(0);
    expect(res.errors).toHaveLength(0);
});
