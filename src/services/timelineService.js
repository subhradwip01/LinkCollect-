const TimelineRepo = require("../repository/timelineRepo");
class TimelineService {
  constructor() {
    this.timelineRepo = new TimelineRepo();
  }
  create = async (data, collectionId) => {
    try {
      // console.log("up",data);
      // data.collectionId = mongoose.Types.ObjectId(data.collectionId); // this line creating problem
      // console.log(data);
      const timeline = await this.timelineRepo.createtimeline(
        data,
        collectionId
      );
      return timeline;
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
  }; // this will get particular timeline id
  getAll = async (id) => {
    try {
      // console.log("service");
      const timeline = await this.timelineRepo.getAll(id);
      return timeline;
    } catch (error) {
      throw error;
    }
  }; // this will get collection id
}

module.exports = TimelineService;
