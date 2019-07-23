import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actionTypes from '../../store/actions'

class Logout extends Component {

  componentDidMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    this.props.onLogout()
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({type: actionTypes.AUTH_LOGOUT})
  }
}

export default connect(null, mapDispatchToProps)(Logout);