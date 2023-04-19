const mongoose = require("mongoose");

const TimelineSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    favicon: {
      type: String
    }
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", TimelineSchema);
module.exports = Timeline;
