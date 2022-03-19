import axios from "axios";
import {
  APPPEND_MESSAGE,
  GET_ALL_MESSAGES_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_WHILE_EXISTING,
} from "../Constants/MessagesConstants";
import io from "socket.io-client";
export const GetMessages = (UserInfo, chatId,exist) => async (dispatch) => {
  dispatch({ type: GET_ALL_MESSAGES_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/message/${chatId}`, config);
    if(exist){
      dispatch({type:GET_ALL_MESSAGES_WHILE_EXISTING,payload:data})
    }
    else{
    dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: data });
    }
  } catch (e) {
    dispatch({ type: GET_ALL_MESSAGES_FAIL, payload: e });
  }
};

//To append new message to current messages by socket.io!!
export const AppendToMessage = (NewMessage) => (dispatch,getState) => {
  console.log("get state is: ")
  console.log(getState.CurrChat)
  dispatch({ type: APPPEND_MESSAGE, payload: NewMessage });
};
