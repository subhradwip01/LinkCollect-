import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import SALT  from '../config';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  profilePic?: string;
  password?: string;
  isPremium: boolean;
  isPublic: boolean;
  collections: Schema.Types.ObjectId[];
  savedCollections: string[];
  emailToken?: string;
  verified?: number;
}

const userSchema: Schema = new Schema(
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    password: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],
    savedCollections: [String],
    socials: [String],
    emailToken: {
      type: String,
    },
    verified: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.password || !this.isModified('password') || !this.isModified('username')) return next();

  const encryptedPassword = bcrypt.hashSync(this.password, Number(SALT));
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
