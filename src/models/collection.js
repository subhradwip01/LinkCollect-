const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique : true
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
    views: {
      type: Number,
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
// CollectionSchema.path('timelines').validate(function(timelines) {
//   return timelines.length <= 50; // set your limit here
// }, 'Too many Links');

// Collection Image
// Upvote
// function autoPopulate(next) {
//   this.populate('Timeline');
//   next();
// }
// CollectionSchema.pre('findOne',autoPopulate);
CollectionSchema.pre("save",function (next) {
  // validate timelines
  if (this.timelines.length > 100) {
    const err = new Error('Too many Links '); 
    return next(err);
  }
  next();
});

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
