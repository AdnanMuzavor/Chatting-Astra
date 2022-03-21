import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ContextProvider";
import SideDrawer from "../Componenets/ChatComponents/SideDrawer";
import MyChats from "../Componenets/ChatComponents/MyChats";
import ChatBox from "../Componenets/ChatComponents/ChatBox";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  }, []);
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-12">
            {/* <SideDrawer /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-12">
            <MyChats />
          </div>

          <div className="col-md-8 col-lg-8 col-12">{/* <ChatBox /> */}</div>
        </div>
      </div>
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
