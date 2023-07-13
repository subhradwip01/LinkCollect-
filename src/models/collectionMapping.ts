import mongoose, { Schema, Document } from "mongoose";

interface ICollectionMapping extends Document {
  collectionId: string;
  isDeleted: boolean;
}

const collectionMappingSchema: Schema<ICollectionMapping> = new Schema({
  collectionId: {
    type: String,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CollectionMapping = mongoose.model<ICollectionMapping>(
  "CollectionMapping",
  collectionMappingSchema
);

export default CollectionMapping;
