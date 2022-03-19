import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import { ChatReducers } from "./Reducers/ChatReducers";
import {MessageReducer} from "./Reducers/MessageReducers";
import { UserReducers } from "./Reducers/UserReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const initialState = {
  UserDetails: {
    UserInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  ChatDetails: {
    CurrChat: localStorage.getItem("selectedChat")
      ? JSON.parse(localStorage.getItem("selectedChat"))
      : null,
  },
};

const reducer = combineReducers({
  UserDetails: UserReducers,
  ChatDetails: ChatReducers,
  MessageDetails:MessageReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
