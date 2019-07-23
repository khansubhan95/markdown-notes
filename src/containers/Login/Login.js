import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import * as actionTypes from "../../store/actions";

class Login extends Component {
  login = event => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.REACT_APP_FIREBASE_KEY,
        user
      )
      .then(response => {
        console.log(response);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("token", response.data.idToken);
        this.props.authUser({
          userId: response.data.localId,
          token: response.data.idToken
        });
        this.props.history.push("/notes");
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        let errorDetail = null;
        switch (error.response.data.error.message) {
          case "INVALID_PASSWORD":
            errorDetail = "Invalid Password";
          case "EMAIL_NOT_FOUND":
            errorDetail =
              "Account with this email does not exist. Please register.";
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
        <h1>Login</h1>
        {authFail}
        <form method="POST" onSubmit={this.login}>
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
          <input className="btn btn-success" type="submit" value="Log in" />
        </form>
        <br />
        Don't have an account? <Link to="/register">Register</Link>
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
    authUser: info =>
      dispatch({ type: actionTypes.AUTH_LOGIN, authInfo: info }),
    authFail: error => dispatch({ type: actionTypes.AUTH_ERROR, error: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
