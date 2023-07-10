const { Collection } = require("../models");

exports.isCollectionOwner = async (req, res, next) => {
  const collectionId = req.params.id;
  // console.log(collectionId);
  try {
    const { userId } = await Collection.findById(collectionId);
    if (req.userId !== userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot edit, read, or add to this collection",
        err: "Unauthorized to perform this action",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error retrieving collection",
      data: {},
    });
  }
};

exports.isCollectionPublic = async (req, res, next) => {
  const collectionId = req.params.id;
  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
        err: "Invalid collection ID",
        data: {},
      });
    }
    if (req.userId !== collection.userId && !collection.isPublic) {
      return res.status(400).json({
        success: false,
        message: "The collection you're trying to access is private",
        err: "Unauthorized to perform this action",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error retrieving collection",
      data: {},
    });
  }
};
