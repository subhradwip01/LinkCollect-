const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimelineSchema = new Schema(
  {
    link: {
      type: String,
    },
    note: {
      type: String,
    },
    time: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Timeline = mongoose.model("Timeline", TimelineSchema);
module.exports = Timeline;
