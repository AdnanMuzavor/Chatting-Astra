import axios from "axios";
import {
  SET_CURRENT_CHAT_FAIL,
  SET_CURRENT_CHAT_REQUEST,
  SET_CURRENT_CHAT_SUCCESS,
} from "../Constants/ChatConstants";
import { USER_LEAVE_GROUP } from "../Constants/UserConstants";

export const setCurrChatVal =
  (userid, UserInfo, isgroup, chatid) => async (dispatch) => {
    dispatch({ type: SET_CURRENT_CHAT_REQUEST });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      console.log("config is: ");
      console.log(config);
      if (!isgroup) {
        const { data } = await axios.post("/api/chat/", { userid }, config);
        if (data) {
          localStorage.setItem("selectedChat", JSON.stringify(data));
          dispatch({ type: SET_CURRENT_CHAT_SUCCESS, payload: data });
        } else {
          dispatch({
            type: SET_CURRENT_CHAT_FAIL,
            payload: "Fail to create chat with user",
          });
        }
      } else {
        const { data } = await axios.post(
          "/api/chat/group/get",
          { chatid },
          config
        );
        if (data) {
          localStorage.setItem("selectedChat", JSON.stringify(data));
          dispatch({ type: SET_CURRENT_CHAT_SUCCESS, payload: data });
        } else {
          dispatch({
            type: SET_CURRENT_CHAT_FAIL,
            payload: "Fail to create chat with user",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
export const LeaveGroup = () => async (dispatch) => {
  dispatch({ type: USER_LEAVE_GROUP });
};
