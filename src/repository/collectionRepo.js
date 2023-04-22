const { Collection, User } = require("../models/index");

class CollectionRepo {
  create = async (data) => {
    try {
      const collection = await Collection.create({ ...data });
      //console.log(collection);
      const user = await User.findById(data.userId);
      if (!user) {
        await Collection.findByIdAndDelete(collection._id);
        throw new Error("User ID is not a Valid ID");
      }
      user.collections.push(collection);
      await user.save();
      return collection;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  async togglePrivacy(userId) {
    try {
      //console.log("userid",userId);
      const collection = await Collection.findById(userId);
      collection.isPublic = !collection.isPublic;
      await collection.save();
      // console.log(collection);
      return collection;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);           
      throw error;
    }
  }
  deleteFromArray = (array, value) => { // here's a scaling issue in future
    let newArray = [];
    for(let i =0;i<array.length;i++){
      if(array[i].toString()!=value.toString()){
         newArray.push(array[i]);
      }
    }
    return newArray;
  }
  delete = async (id) => {
    try {
      const collection = await Collection.findByIdAndRemove(id);
      const userId = collection.userId;
      const user = await User.findById(userId);
      user.collections = this.deleteFromArray(user.collections,id);
      await user.save();
      return collection;
    } catch (error) {
      console.log(error);           
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
      console.log(error);           
      throw error;
    }
  };
  getAll = async (userId) => {
    try {
      const collection = await Collection.find({ userId });
      return collection;
    } catch (error) {
      console.log(error);           
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
      console.log(error);           
      throw error;
    }
  };

  getAllByUsername = async (username, ownsUsername) => {
    try {
      if (!ownsUsername) {
        const collection = await Collection.find({ username, isPublic: true })
          .populate({ path: "timelines" })
          .lean();
        return collection;
      }
      else {
        const collection = await Collection.find({ username })
          .populate({ path: "timelines" })
          .lean();
        return collection;
      }
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };

  doesLinkExist = async (collectionId, link) => {
    try {
      //
      const collection = await Collection.findById(collectionId).populate("timelines")
      const existingLink = collection.timelines.find(timeline => timeline.link === link)

      if (existingLink) return true
      return false;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  }

  update = async (id, data) => {
    try {
      // console.log(data);
      const collection = await Collection.findByIdAndUpdate(id, data, {
        new: true,
      });
      return collection;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  };
  upvote = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      if (!collection) {
        throw new Error("Collection not found");
      }
      collection.upvotes.addToSet(userId);
      await collection.save();
      return collection;

    } catch (error) {
      console.log(error);           
      throw error;
    }
  }
  downvote = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      if (!collection) {
        throw new Error("Collection not found");
      }
      collection.upvotes.pull(userId);
      await collection.save();
      return collection;
    } catch (error) {
      console.log(error);           
      throw error;
    }
  }
}
module.exports = CollectionRepo;
