import {
  NOTIFY_USER,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_OPENED_NOTIFIED_CHAT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../Constants/UserConstants";

export const UserReducers = (
  state = { loading: false, error: "", UserInfo: {}, Notifications: [] },
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
      return { loading: false, error: "", UserInfo: action.payload };
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false };
    case NOTIFY_USER:
      console.log("appending to notifications")
      return {
        ...state,
        Notifications: [action.payload, ...state.Notifications],
      };

    case USER_OPENED_NOTIFIED_CHAT:
      if (state.Notifications) {
        state.Notifications.filter((e) => e._id !== action.payload);
        return { ...state };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};
