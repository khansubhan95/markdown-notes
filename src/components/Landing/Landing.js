import React from 'react';
import { NavLink } from "react-router-dom";

import './Landing.css'
import gif from './react-gif.gif'

const Landing = (props) => {
  return (
    <div className="Landing">
      <h1>React Markdown Notes</h1>
      <NavLink className="Started" to="/login" exact>
        Click here to get started
      </NavLink>
      <img src={gif} alt="gif of app" />
      <p>
        Create by <a href="https://github.com/khansubhan95/">khansubhan95</a>
      </p>
    </div>
  );
}

export default Landing;
