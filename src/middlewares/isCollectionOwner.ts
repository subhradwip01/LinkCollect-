import { Request, Response, NextFunction } from "express";
import CollectionModel from "../models/collection";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isCollectionOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const collectionId = req.params.id;
  try {
    const collection = await CollectionModel.findById(collectionId);
    if (!collection) {
      res.status(404).json({
        success: false,
        message: "Collection not found",
        err: "Invalid collection ID",
        data: {},
      });
    } else if (req.userId !== collection.userId.toString()) {
      res.status(400).json({
        success: false,
        message: "You cannot edit, read, or add to this collection",
        err: "Unauthorized to perform this action",
        data: {},
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error retrieving collection",
      data: {},
    });
  }
};

export const isCollectionPublic = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const collectionId = req.params.id;
  try {
    const collection = await CollectionModel.findById(collectionId);
    if (!collection) {
      res.status(404).json({
        success: false,
        message: "Collection not found",
        err: "Invalid collection ID",
        data: {},
      });
    } else if (
      req.userId !== collection.userId.toString() &&
      !collection.isPublic
    ) {
      res.status(400).json({
        success: false,
        message: "The collection you're trying to access is private",
        err: "Unauthorized to perform this action",
        data: {},
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error retrieving collection",
      data: {},
    });
  }
};
