import {
  USER_LEAVE_GROUP,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_SUCCESS_CHAT,
} from "../Constants/UserConstants";

const {
  SET_CURRENT_CHAT_REQUEST,
  SET_CURRENT_CHAT_SUCCESS,
  SET_CURRENT_CHAT_FAIL,
  SET_SELECTED_CHAT_REQUEST,
  SET_SELECTED_CHAT_SUCCESS,
  RENAME_GROUP_CHAT_REQUEST,
  RENAME_GROUP_CHAT_SUCCESS,
  RENAME_GROUP_CHAT_FAIL,
  ADD_NEW_IN_GROUP_CHAT_REQUEST,
  ADD_NEW_IN_GROUP_CHAT_SUCCESS,
  ADD_NEW_IN_GROUP_CHAT_FAIL,
  REMOVE_USER_GROUP_CHAT_REQUEST,
  REMOVE_USER_GROUP_CHAT_SUCCESS,
  REMOVE_USER_GROUP_CHAT_FAIL,
  RE_INITIALISE_CHAT,
} = require("../Constants/ChatConstants");

export const ChatReducers = (
  state = { loading: false, error: "", CurrChat: {}, SelectedChat: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_REQUEST:
      return { ...state, chatloading: true };
    case SET_CURRENT_CHAT_SUCCESS:
      return { ...state, chatloading: false, CurrChat: action.payload };
    case SET_CURRENT_CHAT_FAIL:
      return {
        ...state,
        chatloading: false,
        CurrChat: {},
        error: action.payload,
      };
    case RE_INITIALISE_CHAT:
      return { ...state, CurrChat: {} };
    case RENAME_GROUP_CHAT_REQUEST:
      return { ...state, chatloading: true };
    case RENAME_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        chatloading: false,
        CurrChat: action.payload,
        error: "",
      };
    case RENAME_GROUP_CHAT_FAIL:
      return { ...state, chatloading: false, error: action.payload };
    case ADD_NEW_IN_GROUP_CHAT_REQUEST:
      return { ...state, chatloading: true };
    case ADD_NEW_IN_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        chatloading: false,
        CurrChat: action.payload,
        error: "",
      };
    case ADD_NEW_IN_GROUP_CHAT_FAIL:
      return { ...state, chatloading: false, error: action.payload };
    case REMOVE_USER_GROUP_CHAT_REQUEST:
      return { ...state, chatloading: true };
    case REMOVE_USER_GROUP_CHAT_SUCCESS:
      console.log("Willing to delete: "+action.payload)
      var userSet=state.CurrChat.users.filter((e)=>e._id!==action.payload);
      console.log(userSet);
      state.CurrChat.users=userSet;
      return {
        ...state,
        chatloading: false,
        CurrChat: state.CurrChat,
        error: "",
      };
    case REMOVE_USER_GROUP_CHAT_FAIL:
      return { ...state, chatloading: false, error: action.payload };
    case USER_LEAVE_GROUP:
      return { chatloading: false, CurrChat: {} };
    case USER_LOGOUT_SUCCESS_CHAT:
      return { chatloading: false, CurrChat: {}, SelectedChat: {}, error: "" };
    case USER_LOGOUT_SUCCESS:
      return { chatloading: false, CurrChat: {}, SelectedChat: {}, error: "" };
    // case SET_SELECTED_CHAT_REQUEST:
    //   return { ...state, selectedchatload: true };
    // case SET_SELECTED_CHAT_SUCCESS:
    //   return {
    //     ...state,
    //     selectedchatload: false,
    //     SelectedChat: action.payload,
    //   };
    default:
      return state;
  }
};
