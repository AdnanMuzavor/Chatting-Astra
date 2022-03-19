import axios from "axios";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../Constants/UserConstants";

export const UserSignup = (name, email, password, pic) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    // const { data } = await axios.post(
    //   "/api/user",
    //   { name, email, password, pic },
    //   {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }
    // );
     const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(data);
    if (data) {
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({ type: USER_SIGNUP_FAIL, payload: "User Signup Fail" });
    }
  } catch (e) {
    dispatch({ type: USER_SIGNUP_FAIL, payload:e.message });
  }
};
