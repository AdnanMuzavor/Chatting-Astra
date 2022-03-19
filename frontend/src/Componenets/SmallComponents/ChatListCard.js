import React, { useState } from "react";

const ChatListCard = ({key,name,email,pic,SelectChatFn,isselected}) => {
  return (
    <>
      <div className={`container chatcont ${isselected?"selected":""}`} onClick={SelectChatFn}>
        <div className="imgcont">
          <img
            src={pic}
            className="rounded-circle avatar"
            style={{ width: "150px" }}
            alt="Avatar"
          />
        </div>
        <div className="detailscont">
            <h6>{name}</h6>
            <p>{email}</p>
        </div>
      </div>
    </>
  );
};

export default ChatListCard;
