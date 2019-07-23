import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Notes from "./containers/Notes/Notes";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Landing from "./components/Landing/Landing";
import Logout from "./components/Logout/Logout";

import * as actionTypes from "./store/actions";

class App extends Component {
  render() {
    let redirect = null
    if (
      localStorage.getItem("expirationDate") !== null &&
      Date.parse(localStorage.getItem("expirationDate")) < new Date()
    ) {
      redirect = <Redirect to="/logout" />
    }
    this.props.authUser({
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      expirationDate: localStorage.getItem("expirationDate")
    });
    return (
      <div className="App">
        <BrowserRouter>
        {redirect}
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/notes" component={Notes} />
            {this.props.isAuthenticated ? (
              <Redirect from="/" to="/notes" />
            ) : (
              <Route path="/" component={Landing} />
            )}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    expirationDate: state.auth.expirationDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: info =>
      dispatch({ type: actionTypes.AUTH_LOGIN, authInfo: info }),
    onLogout: () => dispatch({ type: actionTypes.AUTH_LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
