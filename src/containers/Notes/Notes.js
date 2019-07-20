import React, { Component } from "react";
import update from "immutability-helper";

import "./Notes.css";
import Note from "../../components/Note/Note";
import NewNote from "../../components/NewNote/NewNote";

class Notes extends Component {
  state = {
    notes: [
      {
        id: 1,
        title: "Hello World1",
        content:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      { id: 2, title: "Hello World2", content: "Content 2" },
      { id: 3, title: "Hello World3", content: "Content 3" }
    ],
    selectedNoteId: null,
    selectedNoteTitle: "",
    selectedNoteContent: ""
  };

  noteSubmission = data => {
    let newNote = {
      id: new Date(),
      title: data.newTitle,
      content: data.newContent
    };

    this.setState({ notes: this.state.notes.concat(newNote) });
  };

  clickNote = givenId => {
    let note = Object.assign({}, this.state.notes.find(n => n.id === givenId));
    // console.log(note);

    this.setState({
      selectedNoteTitle: note.title,
      selectedNoteContent: note.content,
      selectedNoteId: note.id
    });
  };

  titleUpdate = event => {
    this.setState({ selectedNoteTitle: event.target.value });
  };

  contentUpdate = event => {
    this.setState({ selectedNoteContent: event.target.value });
  };

  formSubmit = event => {
    event.preventDefault();
    if (event.target.title.value !== "") {
      if (this.state.selectedNoteId !== null) {
        const tempNotes = this.state.notes;
        const noteIndex = tempNotes.findIndex(
          n => n.id === this.state.selectedNoteId
        );

        const updatedObject = update(tempNotes[noteIndex], {
          title: { $set: this.state.selectedNoteTitle },
          content: { $set: this.state.selectedNoteContent }
        });

        let newData = update(tempNotes, {
          $splice: [[noteIndex, 1, updatedObject]]
        });
        this.setState({ notes: newData });
      } else {
        this.noteSubmission({
          newTitle: event.target.title.value,
          newContent: event.target.content.value
        });
        this.setState({ selectedNoteTitle: "", selectedNoteContent: "" });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    let notes = null;
    notes = this.state.notes.map(note => {
      return (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          clicked={this.clickNote}
        />
      );
    });
    return (
      <div className="NotesColumn">
        <div className="Notes">{notes}</div>
        <NewNote
          // submit={this.noteSubmission}
          submit={this.formSubmit}
          titleUpdate={this.titleUpdate}
          contentUpdate={this.contentUpdate}
          titleValue={this.state.selectedNoteTitle}
          contentValue={this.state.selectedNoteContent}
        />
      </div>
    );
  }
}

export default Notes;
