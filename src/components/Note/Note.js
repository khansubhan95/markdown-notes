import React, { Component } from 'react';

import './Note.css'

class Note extends Component {
  render() {
    return (
      <div onClick={() => this.props.clicked(this.props.id)} className="Note">
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default Note;
