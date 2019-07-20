import React, { Component } from "react";
import update from "immutability-helper";

import "./Notes.css";
import Note from "../../components/Note/Note";
import NewNote from "../../components/NewNote/NewNote";
import HelperBar from "../../components/HelperBar/HelperBar";
import * as constants from "../../constants";

class Notes extends Component {
  state = {
    notes: [
      {
        id: 1,
        title: "Welcome",
        content:
          "Welcome to React Markdown Notes. Write your notes here and see them rendered on the right.\nTo get started click on + in the helper bar, write your note and click Save.\n\nUse the helper bar above to insert markdown helper utilities."
      },
      {
        id: 2,
        title: "Lorem ipsum",
        content:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        id: 3,
        title: "Stock Images",
        content:
          "Need stock images? Use this API https://source.unsplash.com/random"
      }
    ],
    selectedNoteId: null,
    selectedNoteTitle: "",
    selectedNoteContent: "",
    formError: false
  };

  componentDidMount() {
    this.clickNote(1);
  }

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

  insertMdHelp = symbol => {
    switch (symbol) {
      case "image":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "![alt](link)"
          )
        });
        break;

      case "heading":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "# Heading"
          )
        });
        break;

      case "bold":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat("**bold**")
        });
        break;

      case "italic":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat("_italic_")
        });
        break;

      case "strikethrough":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "~~strike~~"
          )
        });
        break;

      case "link":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "[link title](link)"
          )
        });
        break;

      case "ul":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "* item 1\n* item 2"
          )
        });
        break;

      case "ol":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "1. item 1\n1. item 2"
          )
        });
        break;

      case "code":
        this.setState({
          selectedNoteContent: this.state.selectedNoteContent.concat(
            "```print('hello world')```"
          )
        });
        break;

      default:
        break;
    }
  };

  newNote = () => {
    this.setState({
      selectedNoteId: null,
      selectedNoteTitle: "",
      selectedNoteContent: constants.FILLER
    });
  };

  render() {
    let notes = null;
    let formError = null;
    if (this.state.formError) {
      formError = (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Don't leave title blank!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    notes = this.state.notes.map(note => {
      return (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          clicked={this.clickNote}
          focus={note.focus}
        />
      );
    });
    return (
      <div className="NotesColumn">
        <HelperBar newNote={this.newNote} insertMdHelp={this.insertMdHelp} />
        {formError}
        <div className="NotesContainer">
          <div className="Notes">{notes}</div>
          <NewNote
            submit={this.formSubmit}
            titleUpdate={this.titleUpdate}
            contentUpdate={this.contentUpdate}
            titleValue={this.state.selectedNoteTitle}
            contentValue={this.state.selectedNoteContent}
          />
        </div>
      </div>
    );
  }
}

export default Notes;
