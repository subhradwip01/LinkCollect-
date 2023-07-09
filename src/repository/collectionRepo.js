const { Collection, User, CollectionMapping } = require("../models/index");

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


  validUserAndCollection = async (user,collection) => {
    if (!user) {
      throw new Error("User ID is not a Valid ID");
    }
    if(!collection){
      throw new Error("Collection ID is not a Valid ID");
    }
  }

  save = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      const user = await User.findById(userId);
      validUserAndCollection(user,collection)
      user.savedCollections.push(collectionId.toString());
      await user.save();
      return collection;
    } catch (error) {
      console.log("Something went wrong at repository layer while saving collection", error);
      throw error;
    }

  }
  unsave = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      const user = await User.findById(userId);
      validUserAndCollection(user,collection)
      // user.savedCollections.push(collectionId.toString());
  
      user.savedCollections = this.deleteFromArray(user.savedCollections,collectionId);
      await user.save();
      return collection;
    } catch (error) {
      console.log("Something went wrong at repository layer while saving collection", error);
      throw error;
    }

  }

  getSavedCollections = async (userId) => {
    try {
  
      const user = await User.findById(userId);
      let allCollections = [];

      for (let i = 0; i < user.savedCollections.length; i++) {
        const collectId = array[i];
        const Map = await CollectionMapping.find({collectionId: collectId})
        // find if deleted or not, if deleted true -> remove collection from saved and also skip adding to return
        if(Map.isDeleted) {
          user.savedCollections = this.deleteFromArray(user.savedCollections,collectId);
          await user.save();
        } else {
          allCollections.push();
          }
      }

      return allCollections;

    } catch (error) {
      console.log("Err in repository layer getting saved collection failed", error);
      throw error;
    }
  }
  async togglePrivacy(userId) {
    try {
      //console.log("userid",userId);
    
      const user = await User.findById(userId);
      const collection = await Collection.findById(userId);
      validUserAndCollection(user,collection)
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
    let newArray = array.filter((item) => item.toString() !== value.toString());
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
        return collection;
      }
      else {
        const collection = await Collection.find({ username })
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
