import React, { Component } from "react";
import { connect } from "react-redux";

import "./Note.css";

class Note extends Component {
  render() {
    let modal = (
      <div class="modal" tabindex="-1" role="dialog" id="exampleModalLong">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Note</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete "{this.props.title}"</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => this.props.delete(this.props.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <a
        href="#"
        onClick={() => this.props.clicked(this.props.id)}
        className="Note"
      >
        {modal}
        <h3>
          {this.props.title}{" "}
          <i
            class="fas fa-trash"
            data-toggle="modal"
            data-target="#exampleModalLong"
          />
        </h3>
        <p>{this.props.content}</p>
      </a>
    );
  }
}

export default Note;
