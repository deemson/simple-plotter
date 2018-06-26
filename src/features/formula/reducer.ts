import {combineReducers} from "redux";
import {ActionType} from "typesafe-actions";

import * as actions from "./actions";

export type FormulaEditorAction = ActionType<typeof actions>;

export type FormulaEditorState = Readonly<{
    formula: string,
}>;

export default combineReducers<FormulaEditorState, FormulaEditorAction>({
    formula: (formula: string, action: any) => {
        if (formula === undefined) {
            return "x";
        }
        return action.payload;
    },
});
