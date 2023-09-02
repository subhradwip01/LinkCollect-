import { User } from "../../models";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const isOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const isSameUser = false;
    console.log(req.params.username, "hello", req.body.username);
    const user = await User.findOne({ username: req.params.username });

    isSameUser;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking if the user is the owner",
      data: {},
    });
  }
};

export default isOwner;
