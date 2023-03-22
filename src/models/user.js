const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Email: {
    type: String,
  },
  Name: {
    type: String,
  },
  ProfilePic: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
