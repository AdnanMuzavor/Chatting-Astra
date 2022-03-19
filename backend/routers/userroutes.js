const { Router } = require("express");
const express = require("express");
//Creating a router
const userRouter = express.Router();

const { registerUser, loginUser, allUsers } = require("../Controllers/usercontrollers");
const {protect} = require("../middleware/authmiddleware");

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/").get(protect,allUsers);

module.exports = userRouter;
