import * as actionTypes from "../actions";

const initialState = {
  token: null,
  userId: null
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
  }
  return state;
};

export default reducer;
