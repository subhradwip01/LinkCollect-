const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");

// Postioning of routes matter, let the specific routes come before general routes
router.get("/:id", collectionController.get);
router.get("/", collectionController.getAll);
router.post("/", collectionController.create);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.deleteCollection);

// Special Route
router.get("/withAllTimelines", collectionController.getAllWithTimeline);

module.exports = router;
