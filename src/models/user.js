const mongoose = require("mongoose");
const { Schema } = mongoose;
const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique : true,
    required: true
  },
  ProfilePic: {
    type: String,
  },
  password: {
    type: String
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
  },
   verified: {
    type: Number,
  }
}, { timestamps: true });

 userSchema.pre('save',function(next){
    //console.log("in hook",SALT);
    console.log(this);
    next();
 })


const User = mongoose.model("User", userSchema);
module.exports = User;
