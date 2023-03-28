const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    timelines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timeline",
      },
    ],
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
