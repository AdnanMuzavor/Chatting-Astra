import {
  Tooltip,
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import ProfileModal from "../SmallComponents/ProfileModal";
// import {ChatState} from "../../Context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Userlogout from "../../Actions/User_logout";
import axios from "axios";
import SearchCard from "../SmallComponents/SearchResultCard";
import Search_loading from "../Loadingcomponents/search_results_loading";
import { setCurrChatVal } from "../../Actions/Current_Chat";

import { GetMessages } from "../../Actions/Get_Messages";

import { UserOpenedNotifiedChat } from "../../Actions/Notify_user";

const SideDrawer = () => {
  //Uisng toast
  const toast = useToast();
  //Getting history var
  const history = useHistory();
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting user data
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, error, UserInfo, Notifications } = UserDetails;

  //For modal viewing
  const [isopen, setisopen] = useState(false);
  //Getting user state
  // const {user}=ChatState();
  //For searching user
  const [search, setsearch] = useState("");

  //To keep API result returned by /search api
  const [searchresult, setsearchresult] = useState([]);

  //Loading while our api gets thr result for us
  const [loading, setloading] = useState(false);

  //On clicking user chat will be loaded
  const [loadingchat, setLoadingchat] = useState();

  //For keeping track of chat currently selected chat/newly added chat
  const [selectedchat, setselectedchat] = useState("");

  //Logout handler
  const LogOutHandler = () => {
    dispatch(Userlogout());
    history.push("/");
  };

  //Search handling functions
  const SearchHandler = async (e) => {
    e.preventDefault();

    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setloading(true);
      //sending token
      const config = {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      console.log(config);
      //Getting search users
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      //Setting serach result array
      setsearchresult(data);
      setloading(false);
      console.log(config);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error occured",
        description: "Fail to load serach result",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };
  //Function for creating chat with user
  const accessChat = async (userid) => {
    alert(`Accessing chat: ${userid}`);
    try {
      setLoadingchat(true);
      // //Preparing token to be sent to backend
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${UserInfo.token}`,
      //   },
      // };
      // //Post request on /api/chat by sending user id
      // const { data } = await axios.post("/api/chat/", { userid }, config);
      // console.log(data);
      // setselectedchat(data);
      // setLoadingchat(false);
      dispatch(setCurrChatVal(userid, UserInfo));
    } catch (e) {
      console.log(e);
      toast({
        title: "Error creating the chat",
        description: "Fail to load serach result",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  //Calling selected Chat function
  const SelectChat = (userid, isgroup, chatid) => {

 

    //If user opnend notified chat
    dispatch(UserOpenedNotifiedChat(chatid));


    setselectedchat(chatid);
    //Set selected chat
    dispatch(setCurrChatVal(userid, UserInfo, isgroup, chatid));
    //get messages of that chat
    dispatch(GetMessages(UserInfo, chatid));
  //   alert("Pushing")
  //   //Pushing to chatting page
  // history.push("/chatting");
  
  };

  const TakeMeToChat = (chatid) => {
    alert(`take me to ${chatid}`);
  };
  return userloading ? (
    "loading"
  ) : (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          <Link className="navbar-brand" to="/chat">
            Chats
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={UserInfo.pic}
                    className="rounded-circle avatar"
                    style={{ width: "150px" }}
                    alt="Avatar"
                  />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setisopen(true)}
                    >
                      My profile
                    </button>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={LogOutHandler}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-bell fa-2x navbar-brand">
                    {Notifications ? Notifications.length : 0}
                  </i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {!Notifications ? (
                    <>
                      {" "}
                      <li>
                        <a className="dropdown-item" href="#">
                          No Messages
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                    <h6 className="notifier_heading">Notifications</h6>
                      {Notifications.map((e) => {
                        return (
                          <>
                            <li
                              key={e._id}
                              className="notifier"
                              onClick={() =>
                                SelectChat(
                                  UserInfo._id,
                                  e.chat.isGroup,
                                  e.chat._id
                                )
                              }
                            >
                              {e.chat.isGroupChat
                                ? ` ${e.chat.chatName}`
                                : ` ${
                                    e.chat.users[0]._id === UserInfo._id
                                      ? e.chat.users[1].name
                                      : e.chat.users[0].name
                                  }`}
                             
                            </li>
                          </>
                        );
                      })}
                    </>
                  )}
                </ul>
              </li>
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={SearchHandler}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
   
        <ProfileModal
          name={UserInfo.name}
          email={UserInfo.email}
          pic={UserInfo.pic}
          isopen={isopen}
        />
      </div>
      {search !== "" ? (
        <div className="container">
          <h5 className="text-center mb-4">Search Results</h5>
          {searchresult.length >= 1 ? (
            <div className="row d-flex justify-content-center">
              {loading ? (
                <Search_loading />
              ) : (
                searchresult.map((e) => {
                  return e._id != UserInfo._id ? (
                    <SearchCard
                      id={e._id}
                      pic={e.pic}
                      name={e.name}
                      AccessFn={() => accessChat(e._id)}
                    />
                  ) : null;
                })
              )}
            </div>
          ) : null}
        </div>
      ) : null}
      
    </>
  );
};

export default SideDrawer;
