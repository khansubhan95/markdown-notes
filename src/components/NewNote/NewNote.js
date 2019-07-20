import React, { Component } from "react";
import "./NewNote.css";

const marked = require("marked");
const domPurify = require("dompurify");

class NewNote extends Component {
  state = {
    newTitle: "",
    newContent: "",
    formError: false
  };

  titleUpdate = event => {
    this.setState({ newTitle: event.target.value });
  };

  contentUpdate = event => {
    this.setState({ newContent: event.target.value });
  };

  getMarkdown = () => {
    let markup = marked(this.state.newContent);
    return markup;
  };

  render() {
    let formError = null;
    if (this.state.formError) {
      formError = <p>Error</p>;
    }
    return (
      <div className="NewNoteColumn">
        <div className="NewNote">
          {formError}
          <form onSubmit={this.props.submit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.props.titleValue}
              onChange={this.props.titleUpdate}
            />
            <br />
            <textarea
              name="content"
              placeholder="Content"
              value={this.props.contentValue}
              onChange={this.props.contentUpdate}
            />
            <br />
            <input
              className="btn btn-success"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <div
          className="RenderMarkdown"
          dangerouslySetInnerHTML={{
            __html: domPurify.sanitize(this.getMarkdown())
          }}
        />
      </div>
    );
  }
}

export default NewNote;
