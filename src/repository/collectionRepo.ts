import { Collection, User, Timeline, deletedCollections, ExplorePage } from "../models/index";
// import { Collection, User, Timeline } from "../models/index";
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

      if (!user) {
        throw new Error("User ID is not a Valid ID");
      }
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

        const collection: any = await Collection.findById(collectId);

        if (!collection) {
          this.unsave(collectId, userId)
       
        } else {
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

  getExplorePage = async (pageSize: any, page: any, tags: any) => {
    try {
      let tagQuery = {};
      let tagsArray;
      let isTagFilter = false;
      if (tags) {
        console.log(typeof tags)
        tagsArray = Array.isArray(tags) ? tags : [tags];
        tagQuery = { tags: { $in: tagsArray } };
        isTagFilter = true;
      }

      // console.log("tagsArray", tagsArray);

      if (isTagFilter) {
        const query = {
          isPublic: true,
          ...tagQuery,
        };

        const collections = await Collection.aggregate([
          { $match: query },
          // {
          //   $lookup: {
          //     from: "timelines",
          //     localField: "_id",
          //     foreignField: "collectionId",
          //     as: "timelines",
          //   },
          // },
          {
            $addFields: {
              countOfLinks: { $size: "$timelines" },
              tagSimilarity: {
                $size: { $setIntersection: ["$tags", tagsArray] },
              },
            },
          },
          {
            $match: {
              countOfLinks: { $gt: 0 }, // Exclude collections with no timelines
            },
          },
          {
            $project: {
              title: 1,
              username: 1,
              image: 1,
              description: 1,
              tags: 1,
              upvotes: 1,
              views: 1,
              countOfLinks: 1,
              tagSimilarity: 1,
              userId: 1,
            },
          },
          {
            $sort: {
              tagSimilarity: -1,
              upvotes: -1,
              countOfLinks: -1,
              views: -1,
            },
          },
          { $skip: (parseInt(page) - 1) * parseInt(pageSize) },
          { $limit: parseInt(pageSize) },
        ]);

        return collections;
      } else {
        // query for timelines array not null and and isPublic true
        let checkForExplorePageData = await this.checkForExplorePageData();
        if(checkForExplorePageData && checkForExplorePageData.length > 0 && page == 1){
          console.log("found in explore db", checkForExplorePageData);
          // reduce array as per pageSize, if < 200
          if(checkForExplorePageData.length > pageSize){
            checkForExplorePageData = checkForExplorePageData.slice(0, pageSize);
          }
          return checkForExplorePageData
        }

        // else query again
        let query = {
          isPublic: true,
        };

        const collections = await Collection.aggregate([
          { $match: query },
          {
            $addFields: {
              countOfLinks: { $size: "$timelines" },
              countOfUpvotes: { $size: "$upvotes" },
              // tagSimilarity: { $size: { $setIntersection: ["$tags", tagsArray] } },
            },
          },
          {
            $match: {
              countOfLinks: { $gt: 0 }, // Exclude collections with no timelines
            },
          },
          {
            $project: {
              title: 1,
              username: 1,
              image: 1,
              description: 1,
              tags: 1,
              upvotes: 1,
              views: 1,
              countOfLinks: 1,
              countOfUpvotes: 1,
              tagSimilarity: 1,
              userId: 1,
            },
          },
          { $sort: { countOfUpvotes: -1, views: -1, countOfLinks: -1 } },
          { $skip: (parseInt(page) - 1) * parseInt(pageSize) },
          { $limit: parseInt(pageSize) },
        ]);

        // console.log(await Collection.find({ isPublic: true }))

        console.log("in explore page, without tag", collections)

        return collections;
      }
    } catch (error) {
      console.log("Error in repository layer getting explore page data", error);
      throw error;
    }
  };

  searchInExplorePage = async (queryFor, page, pageSize) => {
    try {
      if (queryFor.length < 3) {
        throw "search term should be at least 3 characters long";
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
            countOfLinks: { $size: "$timelines" },
            countOfUpvotes: { $size: "$upvotes" },
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
                  }, // If username matches,sortOrder = 2
                  // { case: { $regexMatch: { input: "$tags", regex: regexPattern } }, then: 3 },  // If tags match, sortOrder = 3
                ],
                default: 4, // If no match, sortOrder = 4 (higher value to be at the bottom)
              },
            },
          },
        },
        {
          $project: {
            id: 1,
            title: 1,
            upvotes: 1,
            views: 1,
            description: 1,
            tags: 1,
            countOfLinks: 1,
            countOfUpvotes: 1,
            username: 1,
            sortOrder: 1,
          },
        },
        { $sort: { sortOrder: 1, countOfUpvotes: -1, views: -1 } },
        { $skip: (page - 1) * parseInt(pageSize) }, // Skip documents based on page number
        { $limit: parseInt(pageSize) }, // Limit the number of documents per page
      ]).exec();

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

      this.validUserAndCollection(user, collection);
      collection.isPinned = !collection.isPinned;
      // unix time
      // let unixCurrentTime = Date.now()
      collection.pinnedTime = Date.now();
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
      const collection: any = await Collection.findById(id);
      const userId: any = collection.userId;
      const user: any = await User.findById(userId);
      // save collection to deletedCollectionsArray with userID
      const deletedCollection = await this.createDeletedCollection(collection);
      // delete collection from collection
      await Collection.findByIdAndDelete(id);
      user.collections = this.deleteFromArray(user.collections, id);
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
      const user: any = await User.findById(userId);
      this.validUserAndCollection(user, collection);

      collection.upvotes.addToSet(userId); // add to set to avoid duplicates
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
      const user: any = await User.findById(userId);
      this.validUserAndCollection(user, collection);
      collection.upvotes.pull(userId); // remove from set
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

  async createDeletedCollection(collection) {
    try {
      let importantCollectionData = {
        title: collection.title,
        image: collection.image,
        description: collection.description,
        isPublic: collection.isPublic,
        isPinned: collection.isPinned,
        pinnedTime: collection.pinnedTime,
        upvotes: collection.upvotes,
        userId: collection.userId,
        username: collection.username,
        tags: collection.tags,
        views: collection.views,
        timelines: collection.timelines,
      }
      const deletedCollection = await deletedCollections.create(importantCollectionData);
      return deletedCollection;
    } catch (error) {
      console.log("Something went wrong at collection repository layer", error);
      throw error;
    }

  }

  async checkForExplorePageData() {
    try {
      console.log("in check for explore page data");
      const populatedExplorePage = await ExplorePage.aggregate([
        {
          $lookup: {
            from: "collections", // Replace with the actual collection name
            localField: "collections1",
            foreignField: "_id",
            as: "collections1",
          },
        },
        {
          $addFields: {
            "collections1": {
              $map: {
                input: "$collections1",
                as: "collection",
                in: {
                  $mergeObjects: [
                    "$$collection",
                    { timelineCount: { $size: "$$collection.timelines" } },
                    { upvoteCount: { $size: "$$collection.upvotes" } }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            "collections1.timelines": 0, // Exclude the timelines array
          }
        },
        // Other pipeline stages
      ]);
    
      
        return populatedExplorePage[0].collections1;
    } catch (error) {

      console.log(error)
      return null
      
    }
  }
}

export default CollectionRepo;
