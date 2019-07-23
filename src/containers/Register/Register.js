import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import './Register.css'

class Register extends Component {
  register = event => {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
      returnSecureToken: true
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.REACT_APP_FIREBASE_KEY,
        user
      )
      .then(response => {
        console.log(response);
        this.props.history.push("/login");
      })
      .catch(error => console.log(error));
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/notes" />;
    }
    return (
      <div className="Register">
        {authRedirect}
        <h1>Register</h1>
        <form method="POST" onSubmit={this.register}>
          <div class="form-group">
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Register);
