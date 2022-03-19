import axios from "axios";
import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../Constants/MessagesConstants";

export const SendMessage = (UserInfo, content, chatId,socket) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/message",
      { content, chatId },
      config
    );
    
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
    //To let socketio update us
    socket.emit('new message',data)
    console.log(data)
  } catch (e) {
    console.log(e);
    dispatch({ type: SEND_MESSAGE_FAIL, payload: "Unable to post message" });
  }
};
