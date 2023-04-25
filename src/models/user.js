const mongoose = require("mongoose");
const { Schema } = mongoose;
const { SALT } = require("../config");
const bcrypt = require("bcrypt");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username : {
       type:String,
       required:true,
       unique:true
    },
    profilePic: {
      type: String,
    },
    password: {
      type: String,
    },
    isPublic : {
      type:Boolean,
      default : true
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
      
    ],
    emailToken: {
      type: String,
    },
    verified: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.path('collections').validate(function(collections) {
  return collections.length <= 30; // set your limit here
}, 'Too many collections');

userSchema.pre("save", function (next) {
  if (!this.password || !this.isModified("password")||!this.isModified("username")) return next(); // Added for google auth and unnecessary hash changes whenever user.save is called (could have created bugs)
  const encryptedPassword = bcrypt.hashSync(this.password, Number(SALT));
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
