import chakraUiCssReset from "@chakra-ui/css-reset";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrChatVal } from "../../Actions/Current_Chat";
import { GetMessages } from "../../Actions/Get_Messages";
import Search_loading from "../Loadingcomponents/search_results_loading";
import ChatListCard from "../SmallComponents/ChatListCard";
import SearchCard from "../SmallComponents/SearchResultCard";
import SearchResultMiniCard from "../SmallComponents/SearchResultMiniCard";
const MyChats = () => {
  //To use toast
  const toast = useToast();

  //Getting dispatch
  const dispatch = useDispatch();
  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error: usererror } = UserDetails;

  //Getting state of chat
  const ChatDetails = useSelector((state) => state.ChatDetails);
  const { loading, error, CurrChat } = ChatDetails;
  //Function for fethcing chat of current user

  //Getting chatList saved in state
  const [ChatList, setChatList] = useState([]);

  //Loading of chats
  const [chatloading, setchatloading] = useState(false);

  //For handling modal
  const [modal, setmodal] = useState(false);

  //State for setting group name
  const [groupname, setgroupname] = useState("");

  //For searching user
  const [search, setsearch] = useState("");

  //To keep API result returned by /search api
  const [searchresult, setsearchresult] = useState([]);

  //Search loading
  const [searchloading, setsearchloading] = useState(false);

  //Users who are selected for adding in group
  const [users, setusers] = useState([]);
  const [names, setnames] = useState([]);

  //For selecting users to be added into group
  const AdderUser = (e) => {
    setusers((prev) => [...prev, e]);
    // setnames((prev) => [...prev, name]);
  };

  //This function fetched all chats of logged in user
  const fetchChat = async () => {
    setchatloading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/chat/", config);
      console.log("data of chat");
      console.log(data);
      setChatList(data);
      setchatloading(false);
    } catch (e) {
      setchatloading(false);
      console.log(e);
    }
  };
  //To set index of user from users array to display name
  const [index, setindex] = useState(1);
  //Calling fetch chat usimg useeffect
  useEffect(() => {
    fetchChat();
    // console.log(CurrChat.users[0]._id)
    // console.log(UserInfo._id)
    // if (CurrChat.users[0]._id == UserInfo._id) {
    //   setindex(1);
    // } else {
    //   setindex(0);
    // }
  }, [CurrChat]);
  //Saving current chat
  const [selectedchat, setselectedchat] = useState("");

  //Calling selected Chat function
  const SelectChat = (userid, isgroup, chatid) => {
    setselectedchat(chatid);
    //Set selected chat
    dispatch(setCurrChatVal(userid, UserInfo, isgroup, chatid));
    //get messages of that chat
    dispatch(GetMessages(UserInfo, chatid));
  };

  //Search handling functions
  const SearchHandler = async (e, search) => {
    // alert("search aclled")
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
      setsearchloading(true);
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
      console.log(data);
      setsearchloading(false);
      console.log(config);
      searchresult.map((e) =>
        console.log(users.find((ele) => ele._id === e._id))
      );
    } catch (e) {
      console.log(e);
      toast({
        title: "Error occured(search)",
        description: "Fail to load serach result",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  //Update List Handler updates user lists
  const UpdateListHandler = (id) => {
    setusers((prev) =>
      prev.filter((e) => {
        return e._id !== id;
      })
    );
  };

  const SubmitGroupHandler = async () => {
    if (!groupname) {
      toast({
        title: "Enter group name",
        description: "Can't create group without group name",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    if (!users || users.length <= 1) {
      toast({
        title: "Please select users for group",
        description: "Can't create group without users",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      //Sending ids of users in stringified format
      //Thn we'll be parsing it in backend
      const config = {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        { name: groupname, users: JSON.stringify(users.map((e) => e._id)) },
        config
      );
      console.log(data);
      //updating chatlist by adding this newly created chat
      setChatList([data, ...ChatList]);
      console.log(ChatList);
      toast({
        title: "Group created",
        description: "New group chat has been created",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setmodal(!modal);
      setgroupname("");
      setsearch("");
      return;
    } catch (e) {
      toast({
        title: "Group could not be created",
        description: "New group chat could not be created",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  return loading ? (
    chatloading ? (
      <Search_loading />
    ) : (
      <Search_loading />
    )
  ) : (
    <>
      {/* Modal for cretaing group chat */}
      <div className="row center">
        <div
          className={`modal2 col-md-3 col-lg-3 col-10 ${
            modal ? "vis" : "nonvis"
          }`}
        >
          <div className="closeicon" onClick={() => setmodal(!modal)}>
            X
          </div>
          <div className="modalbody">
            <h1>Create Group Chat</h1>
            <div className="inputs">
              {/* Taking group chat  name */}
              <input
                type="text"
                placeholder="Enter group  name"
                className="groupname"
                onChange={(e) => setgroupname(e.target.value)}
              />
              {/* Searching users directly with help of API */}
              <input
                type="text"
                placeholder="Enter Users"
                className="users"
                onChange={(e) => {
                  setsearch(e.target.value);
                  SearchHandler(e, e.target.value);
                }}
              />
              {/* List of users selected */}
              <div className="selected d-flex justify-content-center">
                <div className="row">
                  {users.map((e) => {
                    return users.length >= 1 ? (
                      <div
                        className="users2 col-md-6 col-lg-6 col-6"
                        key={e._id}
                      >
                        <h6>{e.name.toUpperCase()}</h6>
                        <h1
                          className="closeicon2"
                          onClick={(et) => {
                            UpdateListHandler(e._id);
                          }}
                        >
                          X
                        </h1>
                      </div>
                    ) : (
                      <h1>No users selected</h1>
                    );
                  })}
                </div>
              </div>
              {/* Showing search result so that admin can select users */}
              {search !== "" ? (
                <div className="container">
                  <h5 className="text-center mb-4">Search Results</h5>
                  {searchresult.length >= 1 ? (
                    <div className="row d-flex justify-content-center">
                      {loading ? (
                        <Search_loading />
                      ) : (
                        searchresult.map((e) => {
                          return e._id !== UserInfo._id &&
                            !users.find((ele) => ele._id === e._id) ? (
                            <>
                              <SearchResultMiniCard
                                key={e._id}
                                name={e.name}
                                pic={e.pic}
                                Add={() => AdderUser(e)}
                              />
                            </>
                          ) : null;
                        })
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <button onClick={SubmitGroupHandler}>Create Chat</button>
            </div>
          </div>
        </div>
      </div>
      {/* Body of chat list component */}
      <div className="container allchats">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-12 chatsnavbar">
            <h3>My Chats</h3>
            <div className="buttonwrap">
              <button
                onClick={() => {
                  setmodal(!modal);
                }}
              >
                Create group chat
              </button>

              <i className="fa fa-plus icon" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-12 chatlist">
            {ChatList.map((e, i) => {
              return i >= 0 && e.users.find((e) => e._id === UserInfo._id) ? (
                <ChatListCard
                  key={e._id}
                  name={
                    e.users.length === 2
                      ? e.users[1]._id != UserInfo._id
                        ? e.users[1].name
                        : e.users[0].name
                      : e.chatName
                  }
                  email={
                    e.users.length === 2
                      ? e.users[1]._id != UserInfo._id
                        ? e.users[1].email
                        : e.users[0].email
                      : "Group Chat"
                  }
                  pic={
                    e.users.length === 2
                      ? e.users[1]._id != UserInfo._id
                        ? e.users[1].pic
                        : e.users[0].pic
                      : "https://tse1.mm.bing.net/th?id=OIP.hD_nnTOg6EuVo4Wyur927wHaE8&pid=Api&P=0&w=246&h=164"
                  }
                  // SelectChatFn={() => SelectChat(e.users[1]._id)}

                  SelectChatFn={() =>
                    SelectChat(
                      e.users[1]._id !== UserInfo._id
                        ? e.users[1]._id
                        : e.users[0]._id,
                      e.isGroupChat,
                      e._id
                    )
                  }
                  isselected={selectedchat === e._id ? true : false}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
