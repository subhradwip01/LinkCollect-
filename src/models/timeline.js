const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
     collectionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collection"  
     },
     userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref:'User',
     },
     link :{
        type : String,
        required :true
     },
     note : {
        type : String,
     },
     time : {
        type : Date,
        required :true
     }

},{timestamps:true})

const Timeline = mongoose.model('Timeline',TimelineSchema);
module.exports = Timeline;