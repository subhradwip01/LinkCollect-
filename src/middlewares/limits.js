const CollectionRepo = require('../repository/collectionRepo');
const UserRepo = require('../repository/userRepo');
const collectionRepo = new CollectionRepo();
const userRepo = new UserRepo();

const collectionLimit = async (req, res, next) => {
  try {
    const user = await userRepo.getByUserId(req.userId);
    if (user.collections.length > 29) {
      console.log("30 limit exceeded");
      return res.status(404).json({
        success: false,
        data: {},
        err: "Validation Error {Collection Limit Exceeded}",
        message: "Collection limit exceeded",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking collection limit",
      data: {},
    });
  }
};

const LinkLimit = async (req, res, next) => {
  try {
    const collection = await collectionRepo.get(req.params.id);
    if (collection.timelines.length > 50) {
      console.log("50 limit exceeded");
      return res.status(404).json({
        success: false,
        data: {},
        err: "Validation Error {Link Quota Exceeded}",
        message: "Link limit exceeded",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking link limit",
      data: {},
    });
  }
};

module.exports = {
  collectionLimit,
  LinkLimit
};
