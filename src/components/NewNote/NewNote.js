import React, { Component } from "react";
import "./NewNote.css";

const marked = require("marked");
const domPurify = require("dompurify");

class NewNote extends Component {
  state = {
    formError: false
  };

  getMarkdown = () => {
    let markup = marked(this.props.contentValue);
    return markup;
  };

  render() {
    let formError = null;
    if (this.state.formError) {
      formError = (
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded mr-2" alt="..." />
            <strong className="mr-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">See? Just like this.</div>
        </div>
      );
    }
    return (
      <div className="NewNoteColumn">
        <div className="NewNote">
          {formError}
          <form onSubmit={this.props.submit}>
            <input
              type="text"
              name="title"
              placeholder="Note title"
              value={this.props.titleValue}
              onChange={this.props.titleUpdate}
            />
            <br />
            <textarea
              name="content"
              placeholder="Markdown content"
              value={this.props.contentValue}
              onChange={this.props.contentUpdate}
            />
            <input className="btn btn-success" type="submit" value="Save" />
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
