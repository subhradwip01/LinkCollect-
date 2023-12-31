import { Timeline, Collection } from "../models/index";
import { filterDuplicateTimelines } from "../utils/filterDuplicateTimelines";
import Emit from "../events/events";

let emit = new Emit();

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
     
      emit.bookmarkAdded(payload);
      return timeline;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createMultipleTimelines = async (data, collectionId) => {
    try {
      console.log("in multiple timelines", collectionId)
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
      console.log("Something went wrong at timelines repository layer", error);
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
     
      emit.bookmarkDeleted(payload);
      return timeline;
    } catch (error) {
      console.log("Something went wrong at timelines repository layer", error);
      throw error;
    }
  };

  get = async (id: String | Number | bigint) => {
    try {
      const timeline = await Timeline.findById(id);
      return timeline;
    } catch (error) {
      console.log("Something went wrong at timelines repository layer", error);
      throw error;
    }
  };

  getAll = async (id: String | Number | bigint) => {
    try {
      const timeline = await Timeline.find({ collectionId: id });
      return timeline;
    } catch (error) {
      console.log("Something went wrong at timelines repository layer", error);
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
      console.log("Something went wrong at timelines repository layer", error);
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
      console.log("timeline", timeline)
      if(!timeline) {
        throw "invalid id"
      }
      timeline.isPinned = !timeline.isPinned;
      timeline.pinnedTime = Date.now()

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
