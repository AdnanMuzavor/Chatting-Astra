import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../Constants/UserConstants";

const Userlogin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    // const { data } = await axios.post(
    //   "/api/user/login",
    //   { email, password },
    //   {
    //     headers: {
    //       "Content-type": "application,json",
    //     },
    //   }
    // );
       const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    console.log(data);
    if (data) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: "User Signup Fail" });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: USER_LOGIN_FAIL, payload: e });
  }
};

export default Userlogin;
