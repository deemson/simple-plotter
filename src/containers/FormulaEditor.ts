import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import FormulaEditor from "../components/FormulaEditor";

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: Redux.Dispatch) => Redux.bindActionCreators({}, dispatch);

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FormulaEditor);
