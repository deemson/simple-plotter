import * as React from "react";

export default class FormulaEditor extends React.Component<{}, {}> {
    render() {
        return <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="formula">y = </span>
            </div>
            <input
                type="text"
                className="form-control"
                value="x"
                placeholder="Formula"
                aria-label="Formula"
                aria-describedby="formula"
            />
        </div>;
    }
}
