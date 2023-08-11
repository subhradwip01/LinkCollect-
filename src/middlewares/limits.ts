import CollectionRepo from "../repository/collectionRepo";
import UserRepo from "../repository/userRepo";
import {
  AuthenticatedRequest,
  IResponse,
  INextFunction,
} from "../interface/Request";

const collectionRepo = new CollectionRepo();
const userRepo = new UserRepo();

export const collectionLimit = async (
  req: AuthenticatedRequest,
  res: IResponse,
  next: INextFunction
) => {
  try {
    const user = await userRepo.getByUserId(req.userId);
    console.log("isPremium", user.username, user.isPremium);
    if (user.collections.length > 30 && !user.isPremium ) {
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

export const LinkLimit = async (
  req: AuthenticatedRequest,
  res: IResponse,
  next: INextFunction
) => {
  try {
    const collection: any = await collectionRepo.get(req.params.id);
    const user : any  = await userRepo.getByUserId(collection.userId);
    if(!user.isPremium){ 

    }
    console.log(user.isPremium);
    if (!user.isPremium == null|| (collection.timelines.length > 100 && !user.isPremium)) {
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
