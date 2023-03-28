const { Collection, User } = require("../models/index");

class CollectionRepo {
  create = async (data, userId) => {
    try {
      const collection = await Collection.create({ ...data, userId });
      const user = await User.findById(userId);
      user.collections.push(collection);
      await user.save();
      return collection;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id) => {
    try {
      const collection = await Collection.findByIdAndRemove(id);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  get = async (id) => {
    try {
      const collection = await Collection.findById(id).populate({
        path: "timelines",
      });
      console.log(`THE COLLECTION IS ${collection}`);
      return collection;
    } catch (error) {
      throw error;
    }
  };
  getAll = async (userId) => {
    try {
      const collection = await Collection.find({ userId });
      return collection;
    } catch (error) {
      throw error;
    }
  };
  getAllCollectionsWithTimeline = async (userId) => {
    try {
      const collection = await Collection.find({ userId })
        .populate({ path: "timelines" })
        .lean();
      return collection;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      // console.log(data);
      const collection = await Collection.findByIdAndUpdate(id, data, {
        new: true,
      });
      return collection;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = CollectionRepo;
