const CollectionRepo = require('../repository/collectionRepo');
const UserRepo = require('../repository/userRepo');
const collectionRepo = new CollectionRepo();
const userRepo = new UserRepo();

const collectionLimit = async (req,res,next) => {
    console.log(req.user);

    const user = userRepo.getByUsername(req.user.username);

    if(user.collections.length>30){
    return res.status(404).json({
        success: false,
        data: {},
        err: "Validation Error {Collection Limit Exceeded}",
        message: "Collection limit exceeded",
      });
    }
}

module.exports = collectionLimit;