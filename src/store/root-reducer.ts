import {combineReducers} from "redux";
import {StateType} from "typesafe-actions";

import {formulaEditorReducer} from "../features/formula-editor";

const rootReducer = combineReducers({
    formulaEditor: formulaEditorReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
