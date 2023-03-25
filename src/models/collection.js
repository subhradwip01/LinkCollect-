const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    timeline: [
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
