import { Collection, User, CollectionMapping } from "../models/index";
import tags from "../constants/alltags";
import { IUser } from "models/user";

class CollectionRepo {
  create = async (data) => {
    try {
      if (
        data.tags.length <= 2 ||
        data.title.length <= 59 ||
        data.description.length <= 1000
      ) {
        const collection: any = await Collection.create({ ...data });
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  validUserAndCollection = (user: any, collection: any) => {
    if (!user) {
      throw new Error("User ID is not a Valid ID");
    }
    if (!collection) {
      throw new Error("Collection ID is not a Valid ID");
    }
  };

  save = async (collectionId: string, userId: string) => {
    try {
      const collection: any = await Collection.findById(collectionId);
      const user: any = await User.findById(userId);
      this.validUserAndCollection(user, collection);
      user.savedCollections.push(collectionId.toString());
      await user.save();
      return collection;
    } catch (error) {
      console.log(
        "Something went wrong at repository layer while saving collection",
        error
      );
      throw error;
    }
  };

  unsave = async (collectionId: string, userId: string) => {
    try {
      const collection: any = await Collection.findById(collectionId);
      const user: any = await User.findById(userId);
      this.validUserAndCollection(user, collection);
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
  };

  getSavedCollections = async (userId) => {
    try {
      const user: any = await User.findById(userId);
      if (!user) {
        throw "User not found";
      }
      let allCollections: any = [];
      for (let i = 0; i < user.savedCollections.length; i++) {
        const collectId = user.savedCollections[i];
        const Map: any = await CollectionMapping.find({
          collectionId: collectId,
        });
        if (Map.isDeleted) {
          user.savedCollections = this.deleteFromArray(
            user.savedCollections,
            collectId
          );
          await user.save();
        } else {
          const collection: any = await Collection.findById(collectId);
          allCollections.push(collection);
        }
      }
      return allCollections;
    } catch (error) {
      console.log(
        "Err in repository layer getting saved collection failed",
        error
      );
      throw error;
    }
  };

  getExplorePage = async (pageSize: any, page: any, tags: String[]) => {
    try {
      let tagQuery = {};
      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [tags];
        tagQuery = { tags: { $in: tagsArray } };
      }

      const query = {
        isPublic: true,
        ...tagQuery,
      };

      const collections = await Collection.find(query)
        .select("title image description tags timelines upvotes views")
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));

      const sortedCollections = collections.sort(
        (a, b) => b.upvotes.length - a.upvotes.length
      );

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
      const user: any = await User.findById(userId);
      const collection: any = await Collection.findById(userId);
      this.validUserAndCollection(user, collection);
      collection.isPublic = !collection.isPublic;
      await collection.save();
      return collection;
    } catch (error) {
      console.log("Something went wrong at repository layer", error);
      console.log(error);
      throw error;
    }
  }

  deleteFromArray = (array, value) => {
    let newArray = array.filter((item) => item.toString() !== value.toString());
    return newArray;
  };

  delete = async (id) => {
    try {
      const collection: any = await Collection.findByIdAndRemove(id);
      const userId: any = collection.userId;
      const user: any = await User.findById(userId);
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
      const collection: any = await Collection.find({ userId })
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
        const collection: any = await Collection.find({
          username,
          isPublic: true,
        });
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

  doesLinkExist = async (collectionId, link) => {
    try {
      const collection: any = await Collection.findById(collectionId).populate(
        "timelines"
      );
      const existingLink = collection.timelines.find(
        (timeline: any) => timeline.link === link
      );

      if (existingLink) return true;
      return false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  update = async (id: any, data: any) => {
    try {
      const collection = await Collection.findByIdAndUpdate(id, data, {
        new: true,
      });
      return collection;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  upvote = async (collectionId: any, userId: any) => {
    try {
      const collection: any = await Collection.findById(collectionId);
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

  downvote = async (collectionId: any, userId: any) => {
    try {
      const collection: any = await Collection.findById(collectionId);
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
  };
}

export default CollectionRepo;
