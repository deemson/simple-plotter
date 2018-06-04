import * as React from "react";
import * as ReactRedux from "react-redux";

import {changeFormula} from "./actions";

export interface Props {
    formula: string;
    onChangeFormula: (formula: string) => any;
}

export interface State {
    formula: string;
}

export class FormulaEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="formula">y = </span>
            </div>
            <input
                type="text"
                className="form-control"
                value={this.props.formula}
                placeholder="..."
                aria-label="Formula"
                aria-describedby="formula"
                onChange={(ev): void => {
                    this.props.onChangeFormula(ev.target.value);
                }}
            />
        </div>;
    }
}

const mapStateToProps = (state: State) => {
    return {
        formula: state.formula,
    };
};

export default ReactRedux.connect(mapStateToProps, {
    onChangeFormula: changeFormula,
})(FormulaEditor);
