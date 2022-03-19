const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const protect = asyncHandler(async(req, res, next) => {
    console.log("in protect")
  let token;
  //I.e if headers provided has the token inside
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        
      //req.headers.authorization="Bearer <->token<->"
      //                             0         1
      //Getting token from header
      token = req.headers.authorization.split(" ")[1];
      
      //Decoding token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      
      //set user.req = user)id and send data without excluding password
      req.user = await User.findById({ _id: decoded.userid }).select("-password");
     
      next();
      //
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorised,no token");
  }
});

module.exports = { protect };
