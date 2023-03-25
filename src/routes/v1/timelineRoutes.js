const express = require("express");
const router = express.Router();
const timelineController = require("../../controllers/timelineController");

router.post("/createTimeline", timelineController.create);
router.get("/getTimeline/:id", timelineController.getTimeline);
router.get("/getWholeTimeline/:id", timelineController.getThatTimeline);
router.delete("/deleteTimeline/:id", timelineController.deleteTimeline);
router.patch("/updateTimeline/:id", timelineController.updateTimeline);

module.exports = router;
