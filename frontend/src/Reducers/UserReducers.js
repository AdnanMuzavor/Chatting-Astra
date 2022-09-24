import {
  NOTIFY_USER,
  UPDATE_USER_LOGIN_SUCCESS,
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
    case UPDATE_USER_LOGIN_SUCCESS:
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
      if (!state.Notifications) {
        console.log("didnt existed");
        return { ...state, Notifications: [action.payload] };
      } else {
        console.log("existed");
        if (
          !state.Notifications.find(
            (e) => e.chat._id === action.payload.chat._id
          )
        )
          return {
            ...state,
            Notifications: [...state.Notifications, action.payload],
          };
        else {
          return { ...state };
        }
      }
    case USER_OPENED_NOTIFIED_CHAT:
      // return { ...state, Notifications: []}
      if (state.Notifications.length>=1) {
     
        const Nt = state.Notifications.filter((e) => {
          return e.chat._id != action.payload;
        });
        console.log(Nt)
        return { ...state, Notifications: [...Nt]}
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};
