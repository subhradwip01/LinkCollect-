const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");

router.post("/createCollection", collectionController.create);
router.delete("/deleteCollection/:id", collectionController.deleteCollection);
router.patch("/updateCollection/:id", collectionController.update);
router.get("/collection/:id", collectionController.get);
router.get("collectionAll/:id", collectionController.getAll);
router.get("/CollwithTimeline", collectionController.getAllWithTimeline);

module.exports = router;
