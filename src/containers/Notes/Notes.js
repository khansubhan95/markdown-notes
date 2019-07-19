import React, { Component } from 'react'

import './Notes.css';
import Note from '../../components/Note/Note'
import NewNote from '../../components/NewNote/NewNote'

class Notes extends Component {
  state = {
    notes: [
      { id: 1, title: "Hello World1", content: "Content 1" },
      { id: 2, title: "Hello World2", content: "Content 2" },
      { id: 3, title: "Hello World3", content: "Content 3" }
    ],
    newNoteTitle: 'aa',
    newNoteContent: 'bb'
  };

  noteSubmission =(data) => {
    let newNote = {
      id: new Date(),
      title: data.newTitle,
      content: data.newContent
    };

    this.setState({notes: this.state.notes.concat(newNote)});

  }

  render() {
    let notes = null
    notes = this.state.notes.map(note => {
      return (
        <Note
          key={note.id}
          title={note.title}
          content={note.content}
          titleValue={this.state.newNoteTitle}
          titleContent={this.state.newNoteContent} />
      )
    })
    return (
      <div className="Notes">
        <NewNote submit={this.noteSubmission} />
        <hr />
        {notes}
      </div>
    );
  }
}

export default Notes;