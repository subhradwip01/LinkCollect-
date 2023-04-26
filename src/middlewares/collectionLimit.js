const CollectionRepo = require('../repository/collectionRepo');
const UserRepo = require('../repository/userRepo');
const collectionRepo = new CollectionRepo();
const userRepo = new UserRepo();

const collectionLimit = async (req,res,next) => {
   // console.log(req);

    const user = await userRepo.getByUserId(req.userId);
    //console.log(user);

    if(user.collections.length>30){
    console.log("30 limit exceeded");
    return res.status(404).json({
        success: false,
        data: {},
        err: "Validation Error {Collection Limit Exceeded}",
        message: "Collection limit exceeded",
      });
    }
    next();
}

module.exports = collectionLimit;