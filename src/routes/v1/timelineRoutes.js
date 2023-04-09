const express = require("express");
const timelineController = require("../../controllers/timelineController");
const { isCollectionOwner } = require("../../middlewares/isCollectionOwner");
const router = express.Router({ mergeParams: true }); // merge params will make the prefix param available from the index.js folder;
// To get collection id in our case

// Postioning of routes matter, let the specific routes come before general routes

router.post("/", isCollectionOwner, timelineController.create);

router.patch(
  "/:timelineId",
  isCollectionOwner,
  timelineController.updateTimeline
);

router.delete(
  "/:timelineId",
  isCollectionOwner,
  timelineController.deleteTimeline
);

module.exports = router;

// Not Using
// router.get("/:timelineId", timelineController.getTimeline);
// router.get("/", timelineController.getThatTimeline); // For all timelines
