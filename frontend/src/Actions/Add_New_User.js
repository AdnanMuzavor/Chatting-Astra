import axios from "axios";
import {
  ADD_NEW_IN_GROUP_CHAT_FAIL,
  ADD_NEW_IN_GROUP_CHAT_REQUEST,
  ADD_NEW_IN_GROUP_CHAT_SUCCESS,
} from "../Constants/ChatConstants";

export const AddnewUserToGrp = (UserInfo,newUserId,chatId) =>async (dispatch) => {
  dispatch({ type: ADD_NEW_IN_GROUP_CHAT_REQUEST });
  try {
    const config = {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };

    const { data } = await axios.put(
        "/api/chat/groupadd",
        { chatId, newUserId },
        config
      );
      if (data) {
        dispatch({ type: ADD_NEW_IN_GROUP_CHAT_SUCCESS, payload: data });
      } else {
        dispatch({ type: ADD_NEW_IN_GROUP_CHAT_FAIL });
      }
  } catch (e) {
    dispatch({ type: ADD_NEW_IN_GROUP_CHAT_FAIL });
  }

};
