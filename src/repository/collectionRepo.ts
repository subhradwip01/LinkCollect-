import { Collection, User, CollectionMapping, Timeline } from "../models/index";
import tags from "../constants/alltags";
import Emit from "../events/events";

let emit = new Emit();
class CollectionRepo {
  create = async (data) => {
    try {
      if (
        data.tags?.length <= 2 ||
        data.title?.length <= 59 ||
        data.description?.length <= 1000
      ) {
        const collection: any = await Collection.create({ ...data });
        const user = await User.findById(data.userId);
        if (!user) {
          await Collection.findByIdAndDelete(collection._id);
          throw new Error("User ID is not a Valid ID");
        }
        user.collections.push(collection);
        await user.save();

        const payload = {
          userId: user._id,
          collection: collection,
        };

        emit.collectionCreated(payload);
        return collection;
      } else {
        throw "some issue in your data";
      }
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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
      // console.log(pageSize, page)
      let tagQuery = {};
      let tagsArray;
      if (tags) {
         tagsArray = Array.isArray(tags) ? tags : [tags];
        tagQuery = { tags: { $in: tagsArray } };
      }
  
      const query = {
        isPublic: true,
        ...tagQuery,
      };

      if(tagsArray?.length === 0 || !tagsArray) {
        const query = {
          isPublic: true
        };
        // console.log("hhh")
        const collections = await Collection.aggregate([
          { $match: query },
          {
            $addFields: {
              countOfLinks: { $size: "$timelines" } // Calculate the length of the timelines array
            }
          },
          {
            $project: {
              id: 1,
              title: 1,
              username: 1,
              image: 1,
              description: 1,
              tags: 1,
              upvotes: 1,
              views: 1,
              countOfLinks: 1 // Include the calculated field in the projection
            }
          },
          { $sort: { upvotes: -1 } },
          { $skip: (parseInt(page) - 1) * parseInt(pageSize) },
          { $limit: parseInt(pageSize) }
        ]);
        
        return collections
        // Now, the `collections` array will contain documents with the added `amountOFLinks` field.
        
      }
  
      const collections = await Collection.aggregate([
        { $match: query },
        {
          $addFields: {
            countOfLinks: { $size: "$timelines" },
            tagSimilarity: { $size: { $setIntersection: ["$tags", tagsArray] } }
          }
        },
        {
          $project: {
            title: 1,
            username: 1,
            image: 1,
            description: 1,
            tags: 1,
            // timelines: 1,
            upvotes: 1,
            views: 1,
            countOfLinks: 1,
            tagSimilarity: 1
          }
        },
        { $sort: { tagSimilarity: -1, upvotes: -1 } }, // Sort by tag similarity descending, then upvotes descending
        { $skip: (parseInt(page) - 1) * parseInt(pageSize) },
        { $limit: parseInt(pageSize) }
      ]);
  
      return collections;
    } catch (error) {
      console.log(
        "Err in repository layer getting saved collection failed",
        error
      );
      throw error;
    }
  };
  
  

  searchInExplorePage = async (queryFor) => {
    try {
      if (queryFor.length < 3) {
        throw "search term should be atleast 3 characters long";
      }
      // Create a regex pattern for the search term
      const regexPattern = new RegExp(queryFor, "i");

      const collections = await Collection.aggregate([
        {
          $match: {
            isPublic: true, // Filter by public collections only
            $or: [
              { title: { $regex: regexPattern } }, // Case-insensitive search in title
              { tags: { $elemMatch: { $regex: regexPattern } } }, // Case-insensitive search in tags array
              { username: { $regex: regexPattern } }, // Case-insensitive search in username
            ],
          },
        },
        {
          $addFields: {
            sortOrder: {
              $switch: {
                branches: [
                  {
                    case: {
                      $regexMatch: { input: "$title", regex: regexPattern },
                    },
                    then: 1,
                  }, // If title matches, sortOrder = 1
                  {
                    case: {
                      $regexMatch: { input: "$username", regex: regexPattern },
                    },
                    then: 2,
                  }, // If username matches, sortOrder = 2
                ],
                default: 4, // If no match, sortOrder = 4 (higher value to be at the bottom)
              },
            },
          },
        },
        {
          $sort: { sortOrder: 1, upvotes: -1 }, // Sort by sortOrder (ascending) and upvotes (descending)
        },
      ]).exec();

      // Search in the 'collections' collection based on the 'searchTerm' in title and tags

      // const collections = await Collection.find({
      //   $or: [
      //     { title: { $regex: queryFor, $options: "i" } }, // Case-insensitive search in title
      //     { tags: { $elemMatch: { $regex: queryFor, $options: "i" } } }, // Case-insensitive search in tags array
      //     { username: { $regex: queryFor, $options: "i" } }, // Case-insensitive search in username
      //   ],
      //   isPublic: true, // Filter by public collections only
      // }).sort({ upvotes: -1 }).exec();

      return collections;
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
      console.log("Something went wrong at collection repository layer", error);
      throw error;
    }
  }
  async togglePin(collectionId: String | Number | bigint) {
    try {
      const collection: any = await Collection.findById(collectionId);
      const user: any = await User.findById(collection.userId);

      this.validUserAndCollection(user,collection);
      collection.isPinned.val = !collection.isPinned.val
      // unix time 
      // let unixCurrentTime = Date.now()
      collection.isPinned.pinnedTime = Date.now()
      await collection.save();
      return collection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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

      const payload = {
        userId: user._id,
        collection: collection,
      };

      emit.collectionDeleted(payload);
      return collection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
      throw error;
    }
  };

  getAll = async (userId) => {
    try {
      const collection = await Collection.find({ userId });
      return collection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
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
      //emit event
      const payload = {
        userId: collection.userId,
        collection: collection,
      };
      emit.collectionUpvoted(payload);
      return collection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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
      //emit event
      const payload = {
        userId: collection.userId,
        collection: collection,
      };
      emit.collectionDownvoted(payload);
      return collection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
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
      console.log("Something went wrong at collection repository layer", error);
      throw error;
    }
  };
}

export default CollectionRepo;
