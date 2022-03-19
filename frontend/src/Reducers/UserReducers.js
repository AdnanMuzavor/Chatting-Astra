import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../Constants/UserConstants";

export const UserReducers = (
  state = { loading: false, error: "", UserInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, UserInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, UserInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGOUT_SUCCESS:
      return { loading: false,error:"", UserInfo:action.payload };
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
