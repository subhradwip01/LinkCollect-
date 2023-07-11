const { Collection, User, CollectionMapping } = require("../models/index");
 // Defining the CollectionRepository class
 const tags = require("../constants/alltags"); 
 class CollectionRepo {
  create = async (data) => {
    try {
      if (
        data.tags.length <= 2 ||
        data.title.length <= 59 ||
        data.description.length <= 1000
      ) {
        const collection = await Collection.create({ ...data });
        const user = await User.findById(data.userId);
        if (!user) {
          await Collection.findByIdAndDelete(collection._id);
          throw new Error("User ID is not a Valid ID");
        }
        user.collections.push(collection);
        await user.save();
        return collection;
      } else {
        throw "some issue in your data";
      }

      //console.log(collection);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
   // Method to validate user and collection
  validUserAndCollection =  (user,collection) => {
    if (!user) {
      throw new Error("User ID is not a Valid ID");
    }
    if (!collection) {
      throw new Error("Collection ID is not a Valid ID");
    }
  }
   // Method to save a collection
  save = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      const user = await User.findById(userId);
      // Validate the user and collection
      this.validUserAndCollection(user,collection)
      user.savedCollections.push(collectionId.toString());
      await user.save();
      // Return the collection
      return collection;
    } catch (error) {
      console.log(
        "Something went wrong at repository layer while saving collection",
        error
      );
      throw error;
    }
  }
  unsave = async (collectionId, userId) => {
    try {
      const collection = await Collection.findById(collectionId);
      const user = await User.findById(userId);
      this.validUserAndCollection(user, collection);
      // user.savedCollections.push(collectionId.toString());

      user.savedCollections = this.deleteFromArray(
        user.savedCollections,
        collectionId
      );
      await user.save();

      return collection;
    } catch (error) {
      console.log(
        "Something went wrong at repository layer while saving collection",
        error
      );
      throw error;
    }

  }
   // Method to get all saved collections
  getSavedCollections = async (userId) => {
    try {
      // Find user by ID
      const user = await User.findById(userId);
      let allCollections = [];
       // Loop through the user's saved collections
      for (let i = 0; i < user.savedCollections.length; i++) {
        const collectId = user.savedCollections[i];
        const Map = await CollectionMapping.find({ collectionId: collectId });
        // find if deleted or not, if deleted true -> remove collection from saved and also skip adding to return
        if (Map.isDeleted) {
          user.savedCollections = this.deleteFromArray(
            user.savedCollections,
            collectId
          );
          await user.save();
        } else {
          // If the collection is not deleted, add it to the return array
          const collection = await Collection.findById(collectId);
          allCollections.push(collection);
        }
      }
      // console.log(allCollections)
      return allCollections;
    } catch (error) {
      console.log(
        "Err in repository layer getting saved collection failed",
        error
      );
      throw error;
    }
  };
  getExplorePage = async (pageSize, page, tags) => {
    try {
      // If tags are provided, construct the tag query
      let tagQuery = {};
      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [tags]; // Convert single tag to array if needed
        console.log("here",tagsArray)
        // Build the query to match any of the provided tags
        tagQuery = { tags: { $in: tagsArray } };
      }

      // Construct the main query with tag filtering and pagination
      const query = {
        isPublic: true , // Match public collections
          ...tagQuery, // Apply tag filtering
      };

      // Fetch collections based on the criteria with tag filtering and pagination
      const collections = await Collection.find(query)
        .select("title image description tags timelines upvotes views") // Select the desired fields to return
        .skip((page - 1) * pageSize) // Skip the appropriate number of collections based on the page number
        .limit(Number(pageSize)); // Limit the number of collections to fetch per page

              // Sort the fetched collections in descending order based on the number of upvotes
        const sortedCollections = collections.sort(
        (a, b) => b.upvotes.length - a.upvotes.length
      );

        console.log("here",sortedCollections);
      return sortedCollections;
    } catch (error) {
      console.log(
        "Err in repository layer getting saved collection failed",
        error
      );
      throw error;
    }
  };
  async togglePrivacy(userId) {
    try {
      //console.log("userid",userId);

      const user = await User.findById(userId);
      const collection = await Collection.findById(userId);
      this.validUserAndCollection(user, collection);
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
  deleteFromArray = (array, value) => {
    // here's a scaling issue in future
    let newArray = array.filter((item) => item.toString() !== value.toString());
    return newArray;
  };
  delete = async (id) => {
    try {
      const collection = await Collection.findByIdAndRemove(id);
      const userId = collection.userId;
      const user = await User.findById(userId);
      user.collections = this.deleteFromArray(user.collections, id);
      const map = await CollectionMapping.create({
        collectionId: id,
        isDeleted: true,
      });
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
   // Method to get all collections by username
  getAllByUsername = async (username, ownsUsername) => {
    try {
      if (!ownsUsername) {
        const collection = await Collection.find({ username, isPublic: true });
        return collection;
      } else {
        const collection = await Collection.find({ username });
        return collection;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
   // Method to check if a link exists in a collection
  doesLinkExist = async (collectionId, link) => {
    try {
      //
      const collection = await Collection.findById(collectionId).populate(
        "timelines"
      );
      const existingLink = collection.timelines.find(
        (timeline) => timeline.link === link
      );

      if (existingLink) return true;
      return false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
   // Method to update a collection
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
  };
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
  };

  getTags = async () => {
    try {
      if (!tags) {
        throw new Error("Collection not found");
      }
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
   
  }
}
module.exports = CollectionRepo;
