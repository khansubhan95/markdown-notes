import React from "react";
import { Link } from "react-router-dom";

import "./HelperBar.css";

const helperBar = props => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active nav-link" onClick={props.newNote}>
            <i className="fas fa-plus" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("image")}
          >
            <i className="fas fa-images" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("heading")}
          >
            <i className="fas fa-heading" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("bold")}
          >
            <i className="fas fa-bold" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("italic")}
          >
            <i className="fas fa-italic" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("strikethrough")}
          >
            <i className="fas fa-strikethrough" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("link")}
          >
            <i className="fas fa-link" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("ul")}
          >
            <i className="fas fa-list-ul" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("ol")}
          >
            <i className="fas fa-list-ol" />
          </li>
          <li
            className="nav-item active nav-link"
            onClick={() => props.insertMdHelp("code")}
          >
            <i className="fas fa-code" />
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <a className="navbar-brand mx-auto" href="/">
          React Markdown Notes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
              <Link className="nav-link" to="/logout">
                <i className="fas fa-sign-out-alt" />
              </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default helperBar;
