

import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import SALT from "../../config";

export interface SearchHistory extends Document {
  keyword: Schema.Types.ObjectId[];
  times: Schema.Types.ObjectId[];
}

const searchHistorySchema: Schema = new Schema(
  {
    keyword: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true, collection: "SearchHistory" }
);

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);
export default SearchHistory;
