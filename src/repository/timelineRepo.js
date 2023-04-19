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
      console.log(timelines)

      //push into the corresponding collection and save
      collection.timelines = [...collection.timelines, ...timelines];
      await collection.save();

      return timelines;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  delete = async (id, collectionId) => {
    try {
      const timeline = await Timeline.findByIdAndRemove(id);
      return timeline;
    } catch (error) {
      throw error;
    }
  };
  get = async (id) => {
    try {
      const timeline = await Timeline.findById(id);
      return timeline;
    } catch (error) {
      throw error;
    }
  };
  getAll = async (id) => {
    //collection id
    try {
      const timeline = await Timeline.find({ collectionId: id });
      return timeline;
    } catch (error) {
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
      throw error;
    }
  };
}
module.exports = TimelineRepo;
