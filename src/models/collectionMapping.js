const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionMappingSchema = new Schema({
    collectionId: {
      type: String,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  });



const CollectionMapping = mongoose.model('CollectionMapping', collectionMappingSchema);

module.exports = CollectionMapping;