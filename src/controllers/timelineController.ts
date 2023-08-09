import TimelineService from "../services/timelineService";
const timelineService = new TimelineService();

const create = async (req, res) => {
  try {
    const { id: collectionId } = req.params;
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

const createMultiple = async (req, res) => {
  try {
    const { id: collectionId } = req.params;
    console.log("in multiple timelines", collectionId)

    const timelines = await timelineService.createMultiple(
      req.body,
      collectionId
    );
    return res.status(201).json({
      data: timelines,
      success: true,
      message: "Successfully created Multiple Timelines",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create Multiple Timelines",
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
const togglePin = async (req, res) => {
  try {
    console.log("in togglePin", req.params.timelineId )
    const timeline: any = await timelineService.togglePin(req.params.timelineId);
    console.log(timeline)
    // const isPinnedV: any = timeline.isPinned.val? 'pinned' : 'unpinned';
    return res.status(201).json({
      data: timeline,
      success: true,
      message: `Successfully toggled timeline pin to `,
      err: {},
    });
  } catch (error) {
    console.log("Error in togglePin",error)
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch toggle",
      err: error,
    });
  }
};

const timelineController = {
  create,
  createMultiple,
  deleteTimeline,
  updateTimeline,
  getTimeline,
  getThatTimeline,
  togglePin
};

export default timelineController;
