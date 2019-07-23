import * as actionTypes from "../actions";

const initialState = {
  token: null,
  userId: null,
  error: null,
  expirationDate: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return {
        ...state,
        token: action.authInfo.token,
        userId: action.authInfo.userId,
        expirationDate: action.authInfo.expirationDate
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        expirationDate: null
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
  }
  return state;
};

export default reducer;
