import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isLoggedIn = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.userId) {
    res.status(400).json({
      success: false,
      message: "Please Log In to Access it",
      err: "user not authenticated",
      data: {},
    });
  } else {
    next();
  }
};
