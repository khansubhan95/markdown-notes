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
      .catch(error => console.log(error));
  };

  render() {
    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/notes" />
    }
    return (
      <div className="Register">
        {authRedirect}
        <h1>Login</h1>
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
        <br/>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authUser: info => dispatch({ type: actionTypes.AUTH_LOGIN, authInfo: info })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
