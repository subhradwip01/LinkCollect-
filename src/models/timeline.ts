import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeline extends Document {
  collectionId: Schema.Types.ObjectId;
  title?: string;
  link: string;
  note?: string;
  favicon?: string;
}

const timelineSchema: Schema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
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
      type: String,
    },
  },
  { timestamps: true }
);

const Timeline = mongoose.model<ITimeline>('Timeline', timelineSchema);
export default Timeline;
