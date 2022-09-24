const asyncHandler = require("express-async-handler");
const { cookie } = require("express/lib/response");
const res = require("express/lib/response");
const generatetoken = require("../config/generatetoken");
const User = require("../Models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  console.log("Inside function");
  //Destructing things which it'll be taking from body
  const { name, email, password, pic } = req.body;

  //Thwing errors if any fields are missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  //Checking if user exists in database
  const finduser = await User.findOne({ email: email });
  if (finduser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    //Creating a new user
    if (pic != "") {
      const newUser = await User.create({
        name,
        email,
        password,
        pic,
      });
      const token = await newUser.gettoken(newUser._id);
      if (newUser && token) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pw: newUser.password,
          pic: newUser.pic,
          token: token,
        });
        //Else throw errorr
      } else {
        res.status(400);
        throw new Error("Could not create a user");
      }
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      const token = await generatetoken(newUser._id);
      if (newUser && token) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pw: newUser.password,
          pic: newUser.pic,
          token: token,
        });
        //Else throw errorr
      } else {
        res.status(400);
        throw new Error("Could not create a user");
      }
    }

    //  If user is created return it's data
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pw: newUser.password,
        pic: newUser.pic,
        token: generatetoken(newUser._id),
      });
      //Else throw errorr
    } else {
      res.status(400);
      throw new Error("Could not create a user");
    }
  }
});
//Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const finduser = await User.findOne({ email: email });
  //user found
  if (finduser) {
    //checking if password matches
    const passwordmatch = await finduser.matchPassword(password);

    if (passwordmatch) {
      const token = await finduser.gettoken(finduser._id);
      //Storing token in cookie
      res.cookie("jwttoken", token);
      console.log(token);

      if (token) {
        res.status(201).json({
          _id: finduser._id,
          name: finduser.name,
          email: finduser.email,
          pic: finduser.pic,
          token: token,
        });
      }
      return;
    }
  }
  res.status(400);
  res.send({ Message: "User not found" });
});
//All users
//To search a user we will be sending a query
//{{chatURL}}/api/user?search=piyush&lastname=agarwa
const allUsers = asyncHandler(async (req, res) => {
  //To understand how to take query
  //Method -I
  console.log(req.query); // will print all the quesriues
  const { search, lastname } = req.query;
  //But this is not a good soln as sometimes search may be empty

  //$or performas logical (or) operation on array of statements
  //If anyone is true return true
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : null;
  console.log(`keyword is: ${keyword}`);
  //the result will be stored in keyword and we can search fromm it
  //keyword can be smail if email matched
  //or it can be name if name matched
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //Means find all users except current loggedin user
  //redq.user id value is set by middleware
  res.send(users);
});

const socketidupdator = asyncHandler(async (req, res) => {
  console.log("inside fn");
  const { user, socketid } = req.body;
  console.log(req.body);
  const updateuser = await User.findByIdAndUpdate(
    { _id: user._id },
    { socketid: socketid },
    { new: true }
  );
  console.log(updateuser);
  res.send(updateuser);
});
module.exports = { registerUser, loginUser, allUsers, socketidupdator };
