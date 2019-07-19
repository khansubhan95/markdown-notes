import React, { Component } from "react";

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

  render() {
    let formError = null
    if (this.state.formError) {
      formError = <p>Error</p>
    }
    return (
      <div>
        {formError}
        <form onSubmit={this.formSubmit}>
          <label>
            Title: <input type="text" name="title" onChange={this.titleUpdate} />
          </label>
          <br />
          <label>
            Content: <textarea name="content" onChange={this.contentUpdate} />
          </label>

          <br />
          <input type="submit" value="submit" />
        </form>
        {/* <p dangerouslySetInnerHTML={this.getMarkdown}></p> */}
      </div>
    );
  }
}

export default NewNote;
