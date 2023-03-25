const mongoose = require("mongoose");
const { Schema } = mongoose;
const { SALT } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
