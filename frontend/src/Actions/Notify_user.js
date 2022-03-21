import {
  NOTIFY_USER,
  USER_OPENED_NOTIFIED_CHAT,
} from "../Constants/UserConstants";

export const NotifyUser = (Messagedata) => (dispatch) => {
  dispatch({ type: NOTIFY_USER, payload: Messagedata });
};

export const UserOpenedNotifiedChat = (chatid) => (dispatch) => {
  dispatch({ type: USER_OPENED_NOTIFIED_CHAT, payload: chatid });
};
