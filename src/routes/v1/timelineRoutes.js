const express = require("express");
const timelineController = require("../../controllers/timelineController");
const { isCollectionOwner } = require("../../middlewares/isCollectionOwner");
const {LinkLimit} = require('../../middlewares/limits');
const { checkDuplicateLink } = require("../../middlewares/checkDuplicateLink");
const router = express.Router({ mergeParams: true }); // merge params will make the prefix param available from the index.js folder;
// To get collection id in our case

// Postioning of routes matter, let the specific routes come before general routes

// CRUD Routes
router.post("/", isCollectionOwner,LinkLimit , checkDuplicateLink, timelineController.create);
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

// ----------------------------- SPECIAL ROUTES ---------------------------- //

// To insert multiple timelines at once in a particular collection
router.post("/create-multiple", isCollectionOwner, timelineController.createMultiple);

module.exports = router;

// Not Using
// router.get("/:timelineId", timelineController.getTimeline);
// router.get("/", timelineController.getThatTimeline); // For all timelines
