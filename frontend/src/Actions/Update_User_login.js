import {
  UPDATE_USER_LOGIN_REQUEST,
  UPDATE_USER_LOGIN_SUCCESS,
} from "../Constants/UserConstants";

export const UpdateUserLogin = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_LOGIN_REQUEST });
  dispatch({ type: UPDATE_USER_LOGIN_SUCCESS, payload: data });
};
