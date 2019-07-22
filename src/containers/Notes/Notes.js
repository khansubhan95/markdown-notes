import React, { Component } from "react";
import update from "immutability-helper";
import axios from "axios";
import { connect } from "react-redux";

import "./Notes.css";
import Note from "../../components/Note/Note";
import NewNote from "../../components/NewNote/NewNote";
import HelperBar from "../../components/HelperBar/HelperBar";
import * as actionTypes from "../../store/actions";

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
        this.props.fetchNotes(tempNotes);
      } else {
        this.props.fetchNotes([]);
      }
    });
  }

  noteSubmission = data => {
    let newNote = {
      id: new Date(),
      title: data.newTitle,
      content: data.newContent
    };

    this.props.fetchNotes(this.props.notes.concat(newNote));
  };

  clickNote = givenId => {
    let note = Object.assign({}, this.props.notes.find(n => n.id === givenId));

    this.props.selectNote({
      selectedNoteTitle: note.title,
      selectedNoteContent: note.content,
      selectedNoteId: note.id
    });
  };

  titleUpdate = event => {
    this.props.titleUpdate(event.target.value);
  };

  contentUpdate = event => {
    this.props.contentUpdate(event.target.value);
  };

  formSubmit = event => {
    event.preventDefault();
    if (event.target.title.value !== "") {
      if (this.props.selectedNoteId !== null) {
        const tempNotes = this.props.notes;
        const noteIndex = tempNotes.findIndex(
          n => n.id === this.props.selectedNoteId
        );

        const updatedObject = update(tempNotes[noteIndex], {
          title: { $set: this.props.selectedNoteTitle },
          content: { $set: this.props.selectedNoteContent }
        });

        const tempObject = {
          title: this.props.selectedNoteTitle,
          content: this.props.selectedNoteContent
        };

        axios
          .put("/notes/" + updatedObject.id + ".json", tempObject)
          .then(response => {
            console.log(response);
          });

        let newData = update(tempNotes, {
          $splice: [[noteIndex, 1, updatedObject]]
        });
        this.props.fetchNotes(newData);
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

        this.props.newNote();
      }
    } else {
      this.setState({ formError: true });
    }
  };

  insertMdHelp = symbol => {
    switch (symbol) {
      case "image":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("![alt](link)")
        );
        break;

      case "heading":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("# Heading")
        );
        break;

      case "bold":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("**bold**")
        );
        break;

      case "italic":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("_italic_")
        );
        break;

      case "strikethrough":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("~~strike~~")
        );
        break;

      case "link":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("[link title](link)")
        );
        break;

      case "ul":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("* item 1\n* item 2")
        );
        break;

      case "ol":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("1. item 1\n1. item 2")
        );
        break;

      case "code":
        this.props.contentUpdate(
          this.props.selectedNoteContent.concat("```print('hello world')```")
        );
        break;

      default:
        break;
    }
  };

  newNote = () => {
    this.props.newNote();
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
    notes = this.props.notes.map(note => {
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
        <HelperBar newNote={this.newNote} insertMdHelp={this.insertMdHelp} />
        {formError}
        <div className="NotesContainer">
          <div className="Notes">{notes}</div>
          <NewNote
            submit={this.formSubmit}
            titleUpdate={this.titleUpdate}
            contentUpdate={this.contentUpdate}
            titleValue={this.props.selectedNoteTitle}
            contentValue={this.props.selectedNoteContent}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    selectedNoteId: state.notes.selectedNoteId,
    selectedNoteTitle: state.notes.selectedNoteTitle,
    selectedNoteContent: state.notes.selectedNoteContent,
    formError: state.notes.formError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: notes =>
      dispatch({ type: actionTypes.FETCH_NOTES, notes: notes }),
    selectNote: note => dispatch({ type: actionTypes.SELECT_NOTE, note: note }),
    newNote: () => dispatch({ type: actionTypes.NEW_NOTE }),
    titleUpdate: title =>
      dispatch({ type: actionTypes.TITLE_UPDATE, title: title }),
    contentUpdate: content =>
      dispatch({ type: actionTypes.CONTENT_UPDATE, content: content })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
