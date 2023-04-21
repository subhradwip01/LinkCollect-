const { Collection, User, Timeline } = require("../models");

const getAll = async (req, res) => {
    try {
      const collections = await Collection.find();
      const users = await User.find();
      const timelines = await Timeline.find();

      data = {collections: collections.length, users: users.length, timelines: timelines.length}

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

module.exports = {getAll}