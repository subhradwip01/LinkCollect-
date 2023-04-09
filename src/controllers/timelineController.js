const TimelineService = require("../services/timelineService");
const timelineService = new TimelineService();

const create = async (req, res) => {
  try {
    const { id: collectionId } = req.params;
    console.log(collectionId);
    const timeline = await timelineService.create(req.body, collectionId);
    return res.status(201).json({
      data: timeline,
      success: true,
      message: "Successfully created a Timeline",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create Timeline",
      err: error,
    });
  }
};
const deleteTimeline = async (req, res) => {
  try {
    const { timelineId, id: collectionId } = req.params;
    const timeline = await timelineService.delete(timelineId, collectionId);
    return res.status(201).json({
      data: timeline,
      success: true,
      message: "Successfully deleted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete Timeline",
      err: error,
    });
  }
};
const updateTimeline = async (req, res) => {
  try {
    const timeline = await timelineService.update(
      req.params.timelineId,
      req.body
    );
    return res.status(201).json({
      data: timeline,
      success: true,
      message: "Successfully updated the timeline",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update the Timeline",
      err: error,
    });
  }
};
const getTimeline = async (req, res) => {
  try {
    const timeline = await timelineService.get(req.params.id);
    return res.status(201).json({
      data: timeline,
      success: true,
      message: "Successfully fetched the timeline",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Timeline",
      err: error,
    });
  }
};
const getThatTimeline = async (req, res) => {
  try {
    const timeline = await timelineService.getAll(req.params.id);
    return res.status(201).json({
      data: timeline,
      success: true,
      message: "Successfully fetched the timeline",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Timeline",
      err: error,
    });
  }
};

module.exports = {
  create,
  deleteTimeline,
  updateTimeline,
  getThatTimeline,
  getTimeline,
};
