import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import SALT from "../../config";

export interface ExplorePage extends Document {
  collections1: Schema.Types.ObjectId[];
  collections2: Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema(
  {
    collections1: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    collections2: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  { timestamps: true, collection: "ExplorePage" }
);

const ExplorePage = mongoose.model<ExplorePage>("ExplorePage", userSchema);
export default ExplorePage;
