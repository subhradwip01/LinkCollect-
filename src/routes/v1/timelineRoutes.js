const express = require("express");
const timelineController = require("../../controllers/timelineController");
const router = express.Router({ mergeParams: true }); // merge params will make the prefix param available from the index.js folder;
// To get collection id in our case

// Postioning of routes matter, let the specific routes come before general routes

router.post("/", timelineController.create);
router.patch("/:timelineId", timelineController.updateTimeline);
router.delete("/:timelineId", timelineController.deleteTimeline);

module.exports = router;

// Not Using
// router.get("/:timelineId", timelineController.getTimeline);
// router.get("/", timelineController.getThatTimeline); // For all timelines
