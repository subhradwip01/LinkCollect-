import CollectionRepo from "../../repository/collectionRepo";
import { Collection, ExplorePage } from "../../models/index";

let collectionServiceNew = new CollectionRepo();
export default async function cronSchedule(cron) {
  await explorePageCron(cron);
  console.log("Cron Jobs Started");
}

async function explorePageCron(cron) {
  cron.schedule("15 * * * *", getAndSaveExplorePageToDB);
}

async function getAndSaveExplorePageToDB() {
  try {

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
        },
      },
      { $sort: { countOfUpvotes: -1, views: -1, countOfLinks: -1 } },
      { $limit: 200 },
    ]);

    // console.log(collections);
    // delete all the previous data
    await ExplorePage.deleteMany({});
    // save to explore page db
    let explorePage = await ExplorePage.create({ collections1: collections });
  } catch (error) {
    console.log("in cron job error: ", error);
  }
}
