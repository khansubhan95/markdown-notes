import React, { Component } from "react";

import "./App.css";
import Notes from "./containers/Notes/Notes";
import HelperBar from "./components/HelperBar/HelperBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <HelperBar /> */}
        <Notes />
      </div>
    );
  }
}

export default App;
