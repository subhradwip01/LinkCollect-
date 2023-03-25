const express = require("express");
const timelineController = require("../../controllers/timelineController");
const router = express.Router({ mergeParams: true }); // merge params will make the prefix param available from the index.js folder;
// To get collection id in our case

// Postioning of routes matter, let the specific routes come before general routes

router.get("/:timelineId", timelineController.getTimeline);
router.get("/", timelineController.getThatTimeline); // For all timelines
router.post("/", timelineController.create);
router.delete("/:timelineId", timelineController.deleteTimeline);
router.patch("/:timelineId", timelineController.updateTimeline);

module.exports = router;
