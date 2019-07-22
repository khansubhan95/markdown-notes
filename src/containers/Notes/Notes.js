import React, { Component } from "react";
import update from "immutability-helper";
import axios from "axios";

import "./Notes.css";
import Note from "../../components/Note/Note";
import NewNote from "../../components/NewNote/NewNote";
import HelperBar from "../../components/HelperBar/HelperBar";

var cors = require('cors')

class Notes extends Component {
  state = {
    notes: [],
    selectedNoteId: null,
    selectedNoteTitle: "",
    selectedNoteContent: "",
    formError: false
  };

  componentDidMount() {
    axios.get("/notes.json").then(response => {
      if (response.data !== null) {
        const tempNotes = Object.entries(response.data).map(e =>
          Object.assign(e[1], { id: e[0] })
        );
        this.setState({ notes: tempNotes });
      } else {
        this.setState({ notes: [] });
      }
    });
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

        // console.log('updae',updatedObject);

        const tempObject = {
          title: this.state.selectedNoteTitle,
          content: this.state.selectedNoteContent
        }

        axios
          .put("/notes/" + updatedObject.id + '.json', tempObject)
          .then(response => {
            console.log(response);
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

        axios
          .post("/notes.json", {
            title: event.target.title.value,
            content: event.target.content.value
          })
          .then(response => {
            console.log(response);
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
      selectedNoteContent: ""
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
    if (notes.length === 0) {
      notes = (
        <p style={{ color: "gray" }}>
          This space looks empty. Start by creating some notes!
        </p>
      );
    }
    return (
      <div className="NotesColumn">
        <HelperBar
          newNote={this.newNote}
          insertMdHelp={this.insertMdHelp}
          exportToPdf={this.createPdf}
        />
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
