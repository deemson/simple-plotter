import "bootstrap";
import "./index.html";
import "./styles.scss";

// import "mathjax";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";

// MathJax.Hub.Config({});

import {App} from "./features/App";
import store from "./store";

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById("simple-plotter"),
);
