const { Collection } = require("../models");

exports.isCollectionOwner = async (req, res, next) => {
  const collectionId = req.params.id;
  // console.log(collectionId);
  try{
    const { userId } = await Collection.findById(collectionId);
    if (req.userId != userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot edit,read or add to this collection",
        err: "unauthorized to perform this action",
        data: {},
      });
    }
    next();
  } catch(e) {
    console.log(e)
  }
 
};

exports.isCollectionPublic = async(req,res,next) => {
  const collectionId = req.params.id;
  const collection = await Collection.findById(collectionId);
  if (req.userId != collection.userId && !collection.isPublic) {
    return res.status(400).json({
      success: false,
      message: "The Collection you're trying to access is private!!!",
      err: "unauthorized to perform this action",
      data: {},
    });
  }
  next();
}