import express from "express";
import timelineController from "../../controllers/timelineController";
import { isCollectionOwner } from "../../middlewares/isCollectionOwner";
import { collectionLimit, LinkLimit } from "../../middlewares/limits";
import { checkDuplicateLink } from "../../middlewares/checkDuplicateLink";

const router = express.Router({ mergeParams: true });

// Positioning of routes matter, let the specific routes come before general routes

// CRUD Routes
router.post(
  "/",
  isCollectionOwner,
  LinkLimit,
  checkDuplicateLink,
  timelineController.create
);

router.get("/:id", timelineController.getThatTimeline);

router.patch("/togglePin/:timelineId", isCollectionOwner, timelineController.togglePin);

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


// To insert multiple timelines at once in a particular collection
router.post("/create-multiple", isCollectionOwner, timelineController.createMultiple);

export default router;
