import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const SET_USER_TYPE = "SET_USER_TYPE";
const SET_DOC_ID = "SET_DOC_ID";
const SET_LOCATION = "SET_LOCATION";
const SET_USER = "SET_USER";

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    userType,
  };
};

export const setDocId = (docId) => {
  return {
    type: SET_DOC_ID,
    docId,
  };
};

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

// export const getAccessToken = (code) => {
//   return async (dispatch) => {
//     try {
//       const res = await loginHelper(code);
//       dispatch(setAccessToken(res.access_token));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

const initialState = {
  userType: "",
  docId: "",
  location: {},
  user: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, userType: action.userType };
    case SET_DOC_ID:
      return { ...state, docId: action.docId };
    case SET_LOCATION:
      return { ...state, location: action.location };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
