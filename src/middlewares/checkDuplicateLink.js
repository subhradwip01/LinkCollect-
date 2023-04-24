const { Collection } = require("../models")

exports.checkDuplicateLink = async (req,res,next) => {
      const { id: collectionId } = req.params;
      const {link} = req.body
      const collection = await Collection.findById(collectionId).populate("timelines")
      const existingLink = collection.timelines.find(timeline => timeline.link === link)
      
      if(existingLink){
        return res.status(400).json({
          success: false,
          message: "Link already exists",
          err: "Link already exists",
          data: {},
        });
      }
      return next()
}