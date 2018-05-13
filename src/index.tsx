import "bootstrap";
import "./index.html";
import "./styles.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import {App} from "./components/App";
import rootReducer from "./reducers";

const store = Redux.createStore(rootReducer);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById("simple-plotter"),
);
