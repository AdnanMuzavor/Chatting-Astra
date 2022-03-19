const mongoose = require("mongoose");
//chatname ->will be name of opposite user or will be group name
//isGroupchat ->To help us differenciate between group and individual chats
//users->If personal then will have 2 users, if group more then 2 users
//->We have used type:mongoose.Schema.Types.objectId and ref:"User"
//->This means it'll directly fetch User details from User modal based on Id of current user
//latestMessage ->To keep track of last message  sent in chat
//groupAdmin ->To keep track of admin details
const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
