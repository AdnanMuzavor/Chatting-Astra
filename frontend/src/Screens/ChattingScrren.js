import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppendToMessage, GetMessages } from "../Actions/Get_Messages";
import { RemoveUserFmGrp } from "../Actions/Remove_User_from_group";
import { SendMessage } from "../Actions/Send_Message";
import { RenameGroup } from "../Actions/Update_Grp_Chat_name";
import { isLastMessage, isSameSender } from "../Helpers/User_Message_helper";
import Search_loading from "../Componenets/Loadingcomponents/search_results_loading";

import SearchResultMiniCard from "../Componenets/SmallComponents/SearchResultMiniCard";
import io from "socket.io-client";
import { AddnewUserToGrp } from "../Actions/Add_New_User";
import { LeaveGroup } from "../Actions/Current_Chat";

//SOCKET io connection stuff
const ENDPOINT = "https://mern-chat-a-tive.herokuapp.com/";
var socket, selectedChatCompare;

const ChattingScrren = () => {
  //Getting redux states_____________________________________________________
  const toast = useToast();

  //Getting dispatch
  const dispatch = useDispatch();

  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error: usererror } = UserDetails;

  //Getting state of chat
  const ChatDetails = useSelector((state) => state.ChatDetails);
  const { chatloading, error, CurrChat } = ChatDetails;

  //REDUX PART FOR HANDLING MESSAGES
  const MessageDetails = useSelector((state) => state.MessageDetails);
  const {
    messageloading,
    sendmsgload,
    chatisloading,
    message,
    Messages,
    error: messageerror,
  } = MessageDetails;
  //___________________________________________________________________________
  //Getting all the states

  //For toggling model
  const [modal, setmodal] = useState(false);

  //For searching user
  const [search, setsearch] = useState("");

  //To keep API result returned by /search api
  const [searchresult, setsearchresult] = useState([]);

  //While search is loading
  const [searchloading, setsearchloading] = useState(false);

  //New group name
  const [newgrpname, setnewgrpname] = useState("");

  //Current message which user types
  const [content, setcontent] = useState("");

  //socket.io state
  const [socketconnected, setsocketconnected] = useState(false);
  //____________________________________________________________________________

  //All functions (GROUP RELATED FUNCTIONS)
  //Add new user into group
  const UpdateName = async (e) => {
    e.preventDefault();

    const chatId = CurrChat._id;
    const chatName = newgrpname;

    dispatch(RenameGroup(UserInfo, chatId, chatName));

    setnewgrpname("");
  };
  //Add new user into group
  const AddnewUser = async (newUserId) => {
    const chatId = CurrChat._id;

    dispatch(AddnewUserToGrp(UserInfo, newUserId, chatId));
  };

  //Function to remove user from group
  const RemoveUser = async (userId) => {
    // CurrChat.filter((e)=>e._id===userId)
    const chatId = CurrChat._id;
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/chat/groupremove",
      { chatId, userId },
      config
    );
    console.log(data);

    //If admin is leaving group
    dispatch(RemoveUserFmGrp(data));
    if (userId === UserInfo._id) {
      dispatch(LeaveGroup());
    }
  };
  //__________________________________________________________________________
  //(SEARCH RELATED FUNCTIONS)
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
  //___________________________________________________________________________

  //SEND MESSAGE HANDLER FUNCTIONS
  //Send message handler to send message/call API
  const SendMessageHandler = (e) => {
    e.preventDefault();
    socket.emit("stop typing", CurrChat._id);
    dispatch(SendMessage(UserInfo, content, CurrChat._id, socket));
    setcontent("");
    //Fetching messages of chat as soon as chat loads
    setTimeout(() => {
      dispatch(GetMessages(UserInfo, CurrChat._id, socket));
    }, 2000);
    setTimeout(() => {
      var box = document.getElementById("message");
      box.scrollTop = box.scrollHeight;
    }, 3000);
  };
  //____________________________________________________________________________

  //TYPING HANDLING FUNCTIONS AND STATES
  //Handling typing
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  //For hadnling typing
  const typingHandler = (e) => {
    setcontent(e.target.value);
    if (socketconnected) {
      if (!typing) {
        setTyping(true);
        socket.emit("typing", CurrChat._id);
      }
      let lastTypingTime = new Date().getTime();
      var timerlength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerlength && typing) {
          socket.emit("stop typing", CurrChat._id);
          setTyping(false);
        }
      }, timerlength);
    }
  };

  //__________________________________________________________________________
  //USEEFFECT SECTION
  //Useeffect for connecting with socket.io

  useEffect(() => {
    //socket io code, HELPS MIN CONNECTING WITH SOCKET IO IN BACKEND
    //Connecting socketio with backend
    socket = io(ENDPOINT);
    //Creating room for user
    socket.emit("setup", UserInfo);
    socket.on("connected", () => {
        alert("connected")
      setsocketconnected(true);
    });
    //Making user join room(i.e chat)
    socket.emit("join chat", CurrChat._id);
    //For backup of current message
    selectedChatCompare = CurrChat;
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  //Useeffect to handle real time messaging
  //Use effect to be handled on sending message
  useEffect(() => {
    // alert("annonymous useeffect")
    socket.on("message received", (newMessageReceived) => {
      //       message received
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //Give notification
        console.log("no");
        console.log("give notification");
      } else {
        //  alert("dispatching")
        console.log("Disptc hing action");
        dispatch(AppendToMessage(newMessageReceived));
      }
    });
  });
  return (
    <>
      <h1>Hii you can chat now</h1>
    </>
  );
};

export default ChattingScrren;
