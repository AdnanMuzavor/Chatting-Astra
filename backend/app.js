const express = require("express");
const chats = require("./data/data");
const connection = require("./config/conn");
//Instance of express
const app = express();

//To make server understand json data
app.use(express.json());

//For storing token in cookie
const cookieparser = require("cookie-parser");
app.use(cookieparser());

//Making app capable of usig .env file
const dotenv = require("dotenv");
const userRouter = require("./routers/userroutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const chatrouter = require("./routers/chatrouters");
const messagerouter = require("./routers/messagerouters");
const path=require("path");
dotenv.config();

const port = process.env.PORT || 5000;

//Connecting with data abse
// require("./config/conn")
connection();

//Using API routers

//1->User routers
app.use("/api/user/", userRouter);
app.use("/api/chat", chatrouter);
app.use("/api/message", messagerouter);

//deploying part
const __dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname1,"/frontend/build")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
  })
}
else{
  app.get("/",(req,res)=>{
    res.send("API IS RUNNING");
  })
}

//If APIs does'nt work or any error these lines will be executed
app.use(notFound);
app.use(errorHandler);

//Making server listen to port number
const server = app.listen(port, () => {
  console.log(`Listening to port number: ${port}`);
});

//Linking our app with socket.io

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  //Socket function for: CONNECTING WITH USER AT FRONTEND
  socket.on("setup", (userData) => {
    //This will create a room for the user
    socket.join(userData._id);
    console.log(`User at client is: ${userData._id}`);
    socket.emit("connected");
  });

  //Socket function for connection the chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`user joined room: ${room}`);
  });

  //Socket for sending new message
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    console.log(`chat is:`);
    console.log(chat);
    if (!chat.users) return console.log("chat.users not defined");
    //Making message received to all users except current user
    chat.users.forEach((user) => {
      //It should not be sent to user who is sending message
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      console.log("EMITTING");
      //Else if it's not user who sent message,send it
      socket.emit("message received", newMessageReceived);
    });
  });

  //Socket for handling typing
  socket.on("typing", (room) => {
    console.log("user is typing");
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    console.log("user stop typing");
    socket.in(room).emit("stop typing");
  });

  //Disconnect user
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
