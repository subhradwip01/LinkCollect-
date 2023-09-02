import { Collection } from "../../models";

export const checkDuplicateLink = async (req, res, next) => {
  try {
    const { id: collectionId } = req.params;
    const { link } = req.body;
    const collection = await Collection.findById(collectionId).populate(
      "timelines"
    );
    const existingLink = collection?.timelines.find(
      (timeline: any) => timeline.link === link
    );

    if (existingLink) {
      return res.status(400).json({
        success: false,
        message: "Link already exists",
        err: "Link already exists",
        data: {},
      });
    }
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking duplicate link",
      data: {},
    });
  }
};
