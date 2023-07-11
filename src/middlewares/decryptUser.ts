import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  username: string;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
  username?: string;
}

export const decryptUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization");
  if (!token) return next(); // req.userId will stay undefined
  try {
    const decodedToken = jwt.decode(token.split(" ")[1]) as DecodedToken;
    const { userId, username } = decodedToken;
    req.userId = userId;
    req.username = username;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default decryptUser;
