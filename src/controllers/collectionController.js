const CollectionService = require("../services/collectionService");
const collectionService = new CollectionService();

const create = async (req, res) => {
  try {
    // Adding image url we got from cloudinary to req.body
    if (req.file) {
      req.body.image = req.file.path;
    }
    // Change to req.userId
    const { username, userId } = req;
    const collection = await collectionService.create({ ...req.body, username, userId });
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully created a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create Collections",
      err: error,
    });
  }
};

const togglePrivacy = async (req, res) => {
  try {
    const collection = await collectionService.togglePrivacy(req.params.id);
    let isPublic;
    isPublic = collection.isPublic ? "Public" : "Private";
    return res.status(201).json({
      success: true,
      message: `Successfully made your collection ${isPublic}`,
      data: collection,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
}
const deleteCollection = async (req, res) => {
  try {
    const collection = await collectionService.delete(req.params.id);
    return res.status(201).json({
      data: collection,
      success: true,
      message: `Successfully deleted the Collection `,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete Collections",
      err: error,
    });
  }
};
const update = async (req, res) => {
  try {
    // Adding image url we got from cloudinary to req.body
    if (req.file) {
      req.body.image = req.file.path;
    }
    const collection = await collectionService.update(req.params.id, req.body);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully Updated a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update Collections",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const collection = await collectionService.get(req.params.id);
    const timelinesReverse = collection.timelines.reverse();
    collection.timelines = timelinesReverse;
    
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const collection = await collectionService.getAll(req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};
const getAllWithTimeline = async (req, res) => {
  try {
    const collection = await collectionService.getAllWithTimeline(req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const getAllByUsername = async (req, res) => {
  try {
    const { ownsUsername, username } = req;
    const collection = await collectionService.getAllByUsername(username, ownsUsername);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};


const doesLinkExist = async (req, res) => {
  const { link } = req.body;
  try {
    const response = await collectionService.doesLinkExist(req.params.id, link);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully checked for any duplicate links",
      err: {},
    });
  }
  catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to check for duplicate link",
      err: error,
    });
  }

}

// change to req.userId
const upvote = async (req, res) => {
  try {
    const collection = await collectionService.upvote(req.params.id, req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully upvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to upvote the Collection",
      err: error,
    });
  }
};
// Change to req.userId
const downvote = async (req, res) => {
  try {
    const collection = await collectionService.downvote(
      req.params.id,
      req.userId
    );
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully downvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to downvote the Collection",
      err: error,
    });
  }
};

module.exports = {
  create,
  deleteCollection,
  update,
  getAll,
  get,
  getAllWithTimeline,
  upvote,
  downvote,
  togglePrivacy,
  getAllByUsername,
  doesLinkExist
};
