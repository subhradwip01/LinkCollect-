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
    profilePic: {
      type: String,
    },
    password: {
      type: String,
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


userSchema.pre("save", function (next) {
  if (!this.password || !this.isModified("password")) return next(); // Added for google auth and unnecessary hash changes whenever user.save is called (could have created bugs)
  const encryptedPassword = bcrypt.hashSync(this.password, Number(SALT));
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
