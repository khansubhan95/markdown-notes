import React from "react";

import "./HelperBar.css";

const helperBar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a onClick={props.newNote} className="nav-link" href="#">
              <i className="fas fa-plus" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("image")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-images" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("heading")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-heading" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("bold")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-bold" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("italic")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-italic" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("strikethrough")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-strikethrough" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("link")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-link" />
            </a>
          </li>
          <li
            onClick={() => props.insertMdHelp("ul")}
            className="nav-item active"
          >
            <a className="nav-link" href="#">
              <i class="fas fa-list-ul" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("ol")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-list-ol" />
            </a>
          </li>
          <li className="nav-item active">
            <a
              onClick={() => props.insertMdHelp("code")}
              className="nav-link"
              href="#"
            >
              <i class="fas fa-code" />
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <a className="navbar-brand mx-auto" href="#">
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
          {/* <li className="nav-item active">
            <a className="nav-link" href="#">
              Right
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Link
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default helperBar;
