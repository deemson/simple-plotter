import FormulaParser from "./FormulaParser";

const formulaParser = new FormulaParser([]);
const BaseCstVisitor = formulaParser.getBaseCstVisitorConstructor();

export default BaseCstVisitor;
