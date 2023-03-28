const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");

// Postioning of routes matter, let the specific routes come before general routes

// Special Route
router.get("/without-timelines", collectionController.getAll);

router.get("/:id", collectionController.get);
router.get("/", collectionController.getAllWithTimeline);
router.post("/", collectionController.create);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.deleteCollection);

module.exports = router;
