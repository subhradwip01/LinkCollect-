import { Request, Response } from "express";
import { Collection } from "../models";
import CollectionService from "../services/collectionService";



interface AuthenticatedRequest extends Request {
  userId?: string;
  username?: string;
  ownsUsername?: string;
  file?: Express.Multer.File;
}

const collectionService = new CollectionService();

const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const { username, userId } = req;
    const collection = await collectionService.create({
      ...req.body,
      username,
      userId,
    });

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully created a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create Collections",
      err: error,
    });
  }
};

const saveCollection = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.save(req.params.id, req.userId);

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully saved the Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to save Collections",
      err: error,
    });
  }
};

const unsaveCollection = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.unsave(
      req.params.id,
      req.userId
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully unsaved the Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to unsave Collections",
      err: error,
    });
  }
};

const getSavedCollections = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const collection = await collectionService.getSavedCollections(req.userId);

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched the Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch saved Collections",
      err: error,
    });
  }
};

const getExplorePage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = 1, pageSize = 20, tags } = req.query;
    const collection = await collectionService.getExplorePage(
      pageSize,
      page,
      tags
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched the Explore Page",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch explore page Collections",
      err: error,
    });
  }
};
const searchInExplorePage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const queryFor  = req.query.queryFor as string;
    const { page = 1, pageSize = 20 } = req.query;
    // add check to verify that page and pageSize are integers and not strings
    // page = parseInt(page);
    // pageSize = parseInt(pageSize);

    if (!queryFor || queryFor.trim() === '') {
     // If 'for' parameter is empty or undefined, return an empty result
     return res.json({ collections: [], links: [] });
    }
    const collection = await collectionService.searchInExplorePage(
      queryFor,
      page, 
      pageSize
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully searched the Explore Page",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to search in explore page Collections",
      err: error,
    });
  }
};

const togglePrivacy = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.togglePrivacy(req.params.id);
    const isPublic = collection.isPublic ? "Public" : "Private";

    return res.status(201).json({
      success: true,
      message: `Successfully made your collection ${isPublic}`,
      data: collection,
      err: {},
    });
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};
const togglePin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.togglePin(req.params.id);
    const isPublic = collection.isPinned.val ? "Pinned" : "Unpinnned";

    return res.status(201).json({
      success: true,
      message: `Successfully made your collection pin ${isPublic}`,
      data: collection,
      err: {},
    });
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const deleteCollection = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.delete(req.params.id);

    return res.status(201).json({
      data: collection,
      success: true,
      message: `Successfully deleted the Collection`,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete Collections",
      err: error,
    });
  }
};

const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const collection = await collectionService.update(req.params.id, req.body);

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully Updated a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update Collections",
      err: error,
    });
  }
};

const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection: any = await collectionService.get(req.params.id);
    const timelinesReverse = collection.timelines.reverse();
    collection.timelines = timelinesReverse;

    res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });

    if (
      req.userId != collection.userId &&
      req.username != collection.username
    ) {
      await Collection.findByIdAndUpdate(
        collection._id,
        { $inc: { views: 1 } },
        { new: true }
      );
    }

    return;
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.getAll(req.userId);

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const getTags = async (req: Request, res: Response) => {
  try {
    console.log("getTags");
    const tags = await collectionService.getTags();

    return res.status(201).json({
      data: tags,
      success: true,
      message: "Successfully fetched tags",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch tags",
      err: error,
    });
  }
};

const getAllWithTimeline = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.getAllWithTimeline(req.userId);

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const getAllByUsername = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { ownsUsername, username } = req;
    const collection = await collectionService.getAllByUsername(
      username,
      ownsUsername
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const doesLinkExist = async (req: Request, res: Response) => {
  const { link } = req.body;
  try {
    const response = await collectionService.doesLinkExist(req.params.id, link);

    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully checked for any duplicate links",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to check for duplicate link",
      err: error,
    });
  }
};

const upvote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.upvote(
      req.params.id,
      req.userId
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully upvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to upvote the Collection",
      err: error,
    });
  }
};

const downvote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const collection = await collectionService.downvote(
      req.params.id,
      req.userId
    );

    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully downvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to downvote the Collection",
      err: error,
    });
  }
};

const collectionController = {
  create,
  deleteCollection,
  update,
  getAll,
  get,
  getAllWithTimeline,
  upvote,
  downvote,
  togglePrivacy,
  getAllByUsername,
  doesLinkExist,
  saveCollection,
  unsaveCollection,
  getSavedCollections,
  getTags,
  getExplorePage,
  togglePin,
  searchInExplorePage
};

export default collectionController;
