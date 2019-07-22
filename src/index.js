import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reducer from './store/reducer'

import * as serviceWorker from "./serviceWorker";

const store = createStore(reducer)

axios.defaults.baseURL = "https://react-markdown-notes.firebaseio.com/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
