const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const adduser = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },
  PhoneNO: {
    type: Number,
    required: true,
  },

  Role: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

adduser.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bycrypt.hash(this.Password, 12);
  }
  next();
});
adduser.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("user", adduser);
module.exports = User;
