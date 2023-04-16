const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    username: {
      type: String,
      required: true
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

// Collection Image
// Upvote

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
