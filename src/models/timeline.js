const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
     Collection : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collection"
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