import { STATES } from "mongoose";
import {
  APPPEND_MESSAGE,
  GET_ALL_MESSAGES_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_WHILE_EXISTING,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../Constants/MessagesConstants";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_SUCCESS_MESSAGE,
} from "../Constants/UserConstants";

export const MessageReducer = (
  state = {
    messageloading: false,
    sendmsgload: false,
    Messages: [],
    message: {},
    error: "",
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_MESSAGES_REQUEST:
      return { ...state, chatisloading: true };
    case GET_ALL_MESSAGES_SUCCESS:
      return { ...state, chatisloading: false, Messages: action.payload };
    case GET_ALL_MESSAGES_WHILE_EXISTING:
      return { ...state, chatisloading:false,Messages: action.payload };
    case APPPEND_MESSAGE:
      if (state.Messages.find((e) => e._id === action.payload._id)) {
        console.log("Messsage added");
        return { ...state };
      } else {
        return { ...state, Messages: [...state.Messages, action.payload] };
      }
    case GET_ALL_MESSAGES_FAIL:
      return { ...state, chatisloading: false, error: action.payload };
    case SEND_MESSAGE_REQUEST:
      return { ...state, messageloading: false, sendmsgload: true };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messageloading: false,
        sendmsgload: false,
        message: action.payload,
      };
    case SEND_MESSAGE_FAIL:
      return { ...state, sendmsgload: false, error: action.payload };
    case USER_LOGOUT_SUCCESS_MESSAGE:
      return {
        messageloading: false,
        sendmsgload: false,
        Messages: [],
        message: {},
      };
    case USER_LOGOUT_SUCCESS:
      return {
        messageloading: false,
        sendmsgload: false,
        Messages: [],
        message: {},
      };
    default:
      return state;
  }
};
