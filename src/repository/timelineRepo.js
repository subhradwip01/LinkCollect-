const { Timeline , Collection } = require('../models/index');

class TimelineRepo {
   create = async (data) => {
      try {
         const timeline = await Timeline.create(data);
         //push into the corresponding collection
         const collection = await Collection.findOne(data.id);
         collection.timeline.push(timeline);
         await Collection.save();
         //saved
         return timeline;
      } catch (error) {
         throw error;
      }
   }
   delete = async (id) => {
      try {
         const timeline = await Timeline.findByIdAndRemove(id);
         return timeline;
      } catch (error) {
         throw error;
      }
   }
   get = async(id) => {
      try {
          const timeline =await  Timeline.findById(id);
          return timeline;
      } catch (error) {
         throw error;
      }
   }
   getAll = async(id) => { //collection id
      try {
         const timeline =await Timeline.findById(id);
         return timeline;
     } catch (error) {
        throw error;
     }
   }
   update = async(id,data) => {
       try {
           const timeline = await Timeline.findByIdAndUpdate(id,data,{new:true});
           return timeline;
       } catch (error) {
           throw error;
       }
   }
}
module.exports = TimelineRepo