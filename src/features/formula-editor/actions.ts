import {createStandardAction} from "typesafe-actions";

export const changeFormula = createStandardAction("CHANGE_FORMULA")<string>();
