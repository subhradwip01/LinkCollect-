import { analytics } from "googleapis/build/src/apis/analytics";
import { Collection, User, Timeline } from "../models";
import { liveMessage } from "../constants/liveMessage";
const getAll = async (req, res) => {
  try {
    const collections = await Collection.find();
    const users = await User.find();
    const timelines = await Timeline.find();

    const data = {
      collections: collections.length,
      users: users.length,
      timelines: timelines.length,
    };

    return res.status(201).json({
      data,
      success: true,
      message: "Successfully fetched the required Analytics",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};

const getLiveMessage = async (req, res) => {
  try {
    
    return res.status(201).json({
      data: liveMessage,
      success: true,
      message: "Successfully fetched the live message",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};

const analyticsController = { getAll, getLiveMessage };

export default analyticsController;
