const express = require("express");
const {SendMessage, AllMessages} = require("../Controllers/messagecontrollers");
const {protect} = require("../middleware/authmiddleware");

const messagerouter = express.Router();

messagerouter.route('/').post(protect,SendMessage)
messagerouter.route('/:chatId').get(protect,AllMessages)
module.exports = messagerouter;
