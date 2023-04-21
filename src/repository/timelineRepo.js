const { collection } = require("../models/collection");
const { Timeline, Collection } = require("../models/index");
const { filterDuplicateTimelines } = require("../utils/filterDuplicateTimelines");

class TimelineRepo {
  
  createtimeline = async (data, collectionId) => {
    try {
      // console.log("repositroy");
      const timeline = await Timeline.create(data);
      //push into the corresponding collection
      const collection = await Collection.findById(collectionId);
      //  console.log(collection);
      collection.timelines.push(timeline);
      //console.log(collection);
      await collection.save();
      //saved
      return timeline;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  createMultipleTimelines = async (data, collectionId) => {
    try {
      // Getting Collection and existing Timelines
      const newTimelines = data;
      const collection = await Collection.findById(collectionId).populate("timelines");

      const validNewTimelines = [...filterDuplicateTimelines(collection.timelines, newTimelines)]
      const timelines = await Timeline.create(validNewTimelines);

      //push into the corresponding collection and save
      collection.timelines = [...collection.timelines, ...timelines];
      await collection.save();

      return timelines;
    } catch (error) {
      console.log(error)
      console.log(error);           
      throw error;
    }
  };
  delete = async (id, collectionId) => {
    try {
      const collection = await Collection.findById(collectionId);
      if(!collection) {
          throw new Error("Not a Valid Collection");
      }
      const timeline = await Timeline.findByIdAndRemove(id);
      collection.timelines = this.deleteFromArray(collection.timelines,id);
      await collection.save();
      return timeline;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  get = async (id) => {
    try {
      const timeline = await Timeline.findById(id);
      return timeline;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  getAll = async (id) => {
    //collection id
    try {
      const timeline = await Timeline.find({ collectionId: id });
      return timeline;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const timeline = await Timeline.findByIdAndUpdate(id, data, {
        new: true,
      });
      return timeline;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  deleteFromArray = (array, value) => {
    let newArray = [];
    for(let i =0;i<array.length;i++){
      if(array[i].toString()!=value.toString()){
         newArray.push(array[i]);
      }
    }
    return newArray;
  }
}
module.exports = TimelineRepo;
