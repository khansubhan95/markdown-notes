import * as actionTypes from "../actions";

const initialState = {
  token: null,
  userId: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return {
        ...state,
        token: action.authInfo.token,
        userId: action.authInfo.userId
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
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
