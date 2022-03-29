const asyncHandler = require("express-async-handler");
const { send } = require("express/lib/response");
const Chat = require("../Models/Chatmodel");
const Message = require("../Models/MessageModel");
const User = require("../Models/userModel");

const SendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    res.status(400);
    throw new Error("Invalid data input");
  }
  //Creating content as per message model
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    //Creating message and saving in DB
    var message = await Message.create({ ...newMessage });
    //Now we have to populate user and chat fields
    //execPopulate() is used since we are populating DB instance(old mongoose version)
    message = await message.populate("sender", "name pic");
    //similaryly populating chats
    message = await message.populate("chat");
    //populating users inside chat model
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    //Since this current message is latest message
    //We update latest messga field in chat

    const findchat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { latestMessage: message },
      { new: true }
    );
  //  console.log(message)
    res.send(message);
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});
const AllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).send(messages);
  } catch (e) {
    res.status(400);
    throw new Error(e.Message);
  }
});
module.exports = { SendMessage, AllMessages };
