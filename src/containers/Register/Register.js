import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Register.css";

import * as actionTypes from "../../store/actions";

class Register extends Component {
  register = event => {
    event.preventDefault();
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
        // console.log(response);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        let errorDetail = null;
        switch (error.response.data.error.message) {
          case "EMAIL_EXISTS":
            errorDetail =
              "Account with this email already exists. Please login.";
        }
        this.props.authFail(errorDetail);
      });
  };

  removeError = () => {
    this.props.clearError();
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/notes" />;
    }
    let authFail = null;
    if (this.props.error) {
      authFail = (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.props.error}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.removeError}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return (
      <div className="Register">
        {authRedirect}
        <h1>Register</h1>
        {authFail}
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
          <input className="btn btn-primary" type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authFail: error => dispatch({ type: actionTypes.AUTH_ERROR, error: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
