const { Collection } = require("../models");

exports.isCollectionOwner = async (req, res, next) => {
  const collectionId = req.params.id;
  const { userId } = await Collection.findById(collectionId);
  if (req.userId != userId) {
    return res.status(400).json({
      success: false,
      message: "You cannot edit or add to this collection",
      err: "unauthorized to perform this action",
      data: {},
    });
  }
  next();
};
