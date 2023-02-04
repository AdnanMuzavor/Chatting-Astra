import axios from "axios";
import {
  RENAME_GROUP_CHAT_FAIL,
  RENAME_GROUP_CHAT_REQUEST,
  RENAME_GROUP_CHAT_SUCCESS,
} from "../Constants/ChatConstants";

export const RenameGroup =(UserInfo, chatId, chatName) => async (dispatch) => {

  dispatch({ type: RENAME_GROUP_CHAT_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };
    const { data } = await axios.put(
      "/api/chat/rename",
      { chatId, chatName },
      config
    );
    console.log(data)
    if (data) {
      dispatch({ type: RENAME_GROUP_CHAT_SUCCESS, payload: data });
    } else {
      dispatch({
        type: RENAME_GROUP_CHAT_FAIL,
        payload: "Could not update chat name",
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: RENAME_GROUP_CHAT_FAIL, payload: e });
  }
};
