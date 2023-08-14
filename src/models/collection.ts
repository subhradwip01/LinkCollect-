import mongoose, { Schema, Document } from "mongoose";

interface ICollection extends Document {
  title: string;
  image?: string;
  description?: string;
  isPublic: boolean;
  isPinned: boolean;
  pinnedTime?: Date;

  upvotes: mongoose.Schema.Types.ObjectId[];
  userId: mongoose.Schema.Types.ObjectId;
  username: string;
  tags: string[];
  views?: number;
  timelines: mongoose.Schema.Types.ObjectId[];
}

const CollectionSchema: Schema<ICollection> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    pinnedTime: {
      type: Date,
      default: null
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    username: {
      type: String,
      required: true,
    },
    tags: [String],
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


  // For the Collection collection
  // CollectionSchema.index({ title: "text", tags: "text" });

   
CollectionSchema.pre<ICollection>("save", function (next) {
  if (this.timelines.length > 100) {
    const err = new Error("Too many Links");
    return next(err);
  }
  next();
});



const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
