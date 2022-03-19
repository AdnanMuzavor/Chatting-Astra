const express = require("express");
const {accesschat, fetchchats, creategroupchat, renamegroup, addgroupmembers, removefromgroup, accessgroupchat} = require("../Controllers/chatcontrollers");
const { protect } = require("../middleware/authmiddleware");
const chatrouter = express.Router();

//All are given protect middleware so as to ensure that user is logged in

//For creating a chat
chatrouter.route("/").post(protect,accesschat);
//For fecthing all chats of a user
chatrouter.route("/").get(protect,fetchchats);
//Router for making a group
chatrouter.route("/group").post(protect,creategroupchat);
//Router for getting groupchat
chatrouter.route("/group/get").post(protect,accessgroupchat);
//Router to rename a group
chatrouter.route("/rename").put(protect,renamegroup);
//Router to add member to group
chatrouter.route("/groupadd").put(protect,addgroupmembers);
//Router to delete from group
chatrouter.route("/groupremove").put(protect,removefromgroup);

module.exports = chatrouter;
