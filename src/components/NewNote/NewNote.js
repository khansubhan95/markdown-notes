import React, { Component } from "react";
import './NewNote.css'

const marked = require('marked')
const domPurify = require('dompurify')


class NewNote extends Component {
  state = {
    newTitle: "",
    newContent: "",
    formError: false
  };

  titleUpdate = (event) => {
    this.setState({newTitle: event.target.value})
  }

  contentUpdate = (event) => {
    this.setState({newContent: event.target.value})
  }

  formSubmit = event => {
    event.preventDefault();
    if (this.state.newTitle !== "") {
      this.props.submit({
        newTitle: this.state.newTitle,
        newContent: this.state.newContent
      });
      event.target.title.value = "";
      event.target.content.value = "";
      this.setState({ newTitle: "" });
      this.setState({newContent: ""})
    }
    else {
      this.setState({formError: true})
    }
  };

  getMarkdown = () => {
    let markup = marked(this.state.newContent)
    return markup;
  }

  render() {
    let formError = null
    if (this.state.formError) {
      formError = <p>Error</p>
    }
    return (
      <div className="NewNoteColumn">
        <div className="NewNote">
          {formError}
          <form onSubmit={this.formSubmit}>
            {/* <label> */}
              {/* Title:{" "} */}
              <input type="text" name="title" placeholder="Title" onChange={this.titleUpdate} />
            {/* </label> */}
            <br />
            {/* <label> */}
              {/* Content:{" "} */}
              <textarea name="content" placeholder="Content" onChange={this.contentUpdate} />
            {/* </label> */}

            <br />
            <input className="btn btn-primary" type="submit" value="submit" />
          </form>
        </div>
        <div className="RenderMarkdown"
          dangerouslySetInnerHTML={{
            __html: domPurify.sanitize(this.getMarkdown())
          }}
        />
      </div>
    );
  }
}

export default NewNote;
