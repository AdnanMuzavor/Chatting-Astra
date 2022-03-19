import {
    
    REMOVE_USER_GROUP_CHAT_FAIL,
    REMOVE_USER_GROUP_CHAT_REQUEST,
    REMOVE_USER_GROUP_CHAT_SUCCESS,
  } from "../Constants/ChatConstants";
  
  export const RemoveUserFmGrp = (data) => async(dispatch) => {
    dispatch({ type: REMOVE_USER_GROUP_CHAT_REQUEST });
    if (data) {
      dispatch({ type: REMOVE_USER_GROUP_CHAT_SUCCESS, payload: data });
    } else {
      dispatch({ type: REMOVE_USER_GROUP_CHAT_FAIL });
    }
  };
  