//PURPOSE: tHIS IS MAIN SCREEN WHERE ALL THE FOUR COMPONENTS ARE PRESENT


import React from "react";
import { useEffect } from "react";

import SideDrawer from "../Componenets/ChatComponents/SideDrawer";
import MyChats from "../Componenets/ChatComponents/MyChats";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import img from "../Images/homechatimg.jpg";
import ChatBox from "../Componenets/ChatComponents/ChatBox";
import Footer from "../Componenets/SmallComponents/Footer";
const Chatpage = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting user data
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, error, UserInfo } = UserDetails;

  const history = useHistory();
  useEffect(() => {
    if (!UserInfo.name) {
      history.push("/");
    }
    console.log(UserInfo);
    console.log("User info from problem");
  }, []);
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-12">
            <SideDrawer />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-12">
            <MyChats />
          </div>

          <div className="col-md-8 col-lg-8 col-12 homeimgcont ">
            {
              UserInfo && UserInfo._id?    <ChatBox/>:"Not Successful login"
            }
       
           
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Chatpage;
/*
  <div className="">
        <div className="row">
     
          <div className="col-md-12 col-lg-12 col-12">
            <SideDrawer />
          </div>
        </div>
        <div className="row">
         
          <div className="col-md-4 col-lg-4 col-12">
            <MyChats />
          </div>
         
          <div className="col-md-8 col-lg-8 col-12">
            <ChatBox />
          </div>
        </div>
      </div>
*/
