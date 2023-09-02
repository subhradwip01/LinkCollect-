import UserRepo from "../../repository/userRepo";
import { AuthenticatedRequest } from "../../interface/Request";

const userRepo = new UserRepo();

// To check if the user is Public

const isUserPublic = async (req: AuthenticatedRequest, res, next) => {
  try {
    const { userId } = req;
    const { username } = req.params;
    const user = await userRepo.getByUsername(username);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist by this Username",
        err: "User not Exist",
        data: {},
      });
    }

    if (userId == user._id) {
      req.ownsUsername = true;
      return next();
    }

    if (!user.isPublic) {
      return res.status(400).json({
        success: false,
        message: "User is not Public",
        err: "Not a Public User",
        data: {},
      });
    }

    req.username = username;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking if the user is public",
      data: {},
    });
  }
};

export default isUserPublic;
