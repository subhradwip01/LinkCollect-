import TimelineRepo from "../repository/timelineRepo";
// import CollectionRepo from "../repository/collectionRepo";

class TimelineService {
  timelineRepo: TimelineRepo;
  constructor() {
    this.timelineRepo = new TimelineRepo();
  }

  create = async (data, collectionId) => {
    try {
      data.collectionId = collectionId;
      const timeline = await this.timelineRepo.createTimeline(data, collectionId);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

  createMultiple = async (data, collectionId) => {
    try {
      data = data.map(timeline => {
        return { ...timeline, collectionId };
      });
      const timelines = await this.timelineRepo.createMultipleTimelines(data, collectionId);
      return timelines;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id, collectionId) => {
    try {
      const timeline = await this.timelineRepo.delete(id, collectionId);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const timeline = await this.timelineRepo.update(id, data);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

  get = async (id) => {
    try {
      const timeline = await this.timelineRepo.get(id);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

  getAll = async (id) => {
    try {
      const timeline = await this.timelineRepo.getAll(id);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

  togglePin = async (timelineId: any) => {
    try {
      console.log("timeline", timelineId)

      const timeline = await this.timelineRepo.togglePin(timelineId);
      return timeline;
    } catch (error) {
      throw error;
    }
  };

}

export default TimelineService;
