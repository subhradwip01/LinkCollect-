const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Email: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true,
  },
  ProfilePic: {
    type: String,
  },
  Collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection"
    }
  ],
  emailToken: {
    type: String,
    reruired: true
  }, verified: {
    type: Number,
    Default: 0,
  }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;
