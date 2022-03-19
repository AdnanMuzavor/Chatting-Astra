import {useEffect} from "react";
import {useState} from "react";
import {useContext} from "react";
import {useHistory} from "react-router-dom"
const {createContext} = require("react");

//Creating a context
const ChatContext=createContext();


//Creating a provider
const ChatProvider=({children})=>{
    //Getting state to have user info
    const [user,setuser]=useState();
    const history=useHistory();

    //As we are storing userInfo inside localstorage,getting it from there
    useEffect(()=>{
        const userInfo= JSON.parse(localStorage.getItem("userInfo"));
        console.log(`userinfo is: ${userInfo}`)
        setuser(userInfo);
        if(!userInfo){
            history.push('/');
        }
    },[history])


    //To make state available through application we pass it as well as it's set fn as value
    return (<ChatContext.Provider value={{user,setuser}}>{children}</ChatContext.Provider>)
}

//Creating a state variable which will be holding our state
export const ChatState=()=>{
    return useContext(ChatContext);
}
//Wrap the <app/> component with this chat provider
//So that state is availabe through app
export default ChatProvider;