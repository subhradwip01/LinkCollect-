import { Timeline, Collection } from "../models/index";
import { filterDuplicateTimelines } from "../utils/filterDuplicateTimelines";
import { EventEmitter } from "../events/io"
class TimelineRepo {
  createTimeline = async (data, collectionId) => {
    try {
      const timeline = await Timeline.create(data);
      const collection: any = await Collection.findById(collectionId);
      collection.timelines.push(timeline);
      await collection.save();

      const payload = {
        collectionId: collection._id,
        bookmark: timeline
      } 
     
      EventEmitter("bookmark:added", payload);

      return timeline;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createMultipleTimelines = async (data, collectionId) => {
    try {
      const newTimelines = data;
      const collection: any = await Collection.findById(collectionId).populate(
        "timelines"
      );
      const validNewTimelines = filterDuplicateTimelines(
        collection.timelines,
        newTimelines
      );
      const timelines: any = await Timeline.create(validNewTimelines);
      collection.timelines = [...collection.timelines, ...timelines];
      await collection.save();
      return timelines;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  delete = async (id: any, collectionId: any) => {
    try {
      const collection: any = await Collection.findById(collectionId);
      if (!collection) {
        throw new Error("Not a Valid Collection");
      }
      const timeline = await Timeline.findByIdAndRemove(id);
      collection.timelines = this.deleteFromArray(collection.timelines, id);
      await collection.save();
      
      const payload = {
        collectionId: collection._id,
        bookmark: timeline
      } 
     
      EventEmitter("bookmark:deleted", payload);
      return timeline;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  get = async (id: String | Number | bigint) => {
    try {
      const timeline = await Timeline.findById(id);
      return timeline;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getAll = async (id: String | Number | bigint) => {
    try {
      const timeline = await Timeline.find({ collectionId: id });
      return timeline;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  update = async (id: String | Number | bigint, data: any) => {
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

  deleteFromArray = (array: any, value: any) => {
    return array.filter(
      (timeline: any) => timeline.toString() !== value.toString()
    );
  };

  async togglePin(timelineId: String | Number | bigint) {
    try {
      const timeline: any = await Timeline.findById(timelineId);
      if(!timeline) {
        throw "invalid id"
      }
      timeline.isPinned = !timeline.isPinned;
      await timeline.save();
      return timeline;
    } catch (error) {
      console.log("Something went wrong at repository layer of timeline", error);
      console.log(error);
      throw error;
    }
  }
}

export default TimelineRepo;
