const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://www.carrycargo.com/wp-content/uploads/2018/10/user_dummy.jpg",
    },
    socketid:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

//pre save function i.e this function will run before data is saved on database
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //Generating a salt
  //Using this salt to hash the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const jwt = require("jsonwebtoken");
//Generating token
userSchema.methods.gettoken = async function (userid) {
  console.log("Generating token");
  const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  console.log(token);
  return token;
};
//Creating a method to  work specifically on schema
userSchema.methods.matchPassword = async function (passworde) {
  return await bcrypt.compare(passworde, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
