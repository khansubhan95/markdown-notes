import React, { Component } from 'react';

import './App.css';
import Notes from './containers/Notes/Notes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notes />
      </div>
    )
  }
}

export default App;