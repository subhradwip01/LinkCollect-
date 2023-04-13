const { Collection, User } = require("../models/index");

class CollectionRepo {
  create = async (data, userId) => {
    try {
      const collection = await Collection.create({ ...data, userId });
      //console.log(collection);
        const user = await User.findById(userId);
        if(!user){
          await Collection.findByIdAndDelete(collection._id);
          throw new Error("User ID is not a Valid ID");
        }
        user.collections.push(collection);
        await user.save();
      return collection;
    } catch (error) {
      throw error;
    }
  };
  async togglePrivacy(userId){
    try {
      //console.log("userid",userId);
       const collection = await Collection.findById(userId);
      collection.isPublic = !collection.isPublic;
      await collection.save();
     // console.log(collection);
      return collection;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      throw error;
    }
  }
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
  upvote = async(collectionId,userId)=>{
    try {
      const collection = await Collection.findById(collectionId);
      if(!collection){
          throw new Error("Collection not found");
      }
      collection.upvotes.addToSet(userId);
      await collection.save();
      return collection;

    } catch (error) {
      throw error;
    }
  }
  downvote = async(collectionId,userId)=>{
     try {
        const collection = await Collection.findById(collectionId);
        console.log(collection);
        if(!collection){
          throw new Error("Collection not found");
      }
      collection.upvotes.pull(userId);
      await collection.save();
      return collection;
     } catch (error) {
      throw error;
     }
  }
}
module.exports = CollectionRepo;
