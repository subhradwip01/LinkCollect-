const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");
const {isPublicCheck,userExist,checkWhenSomeoneisFetchigCollection} = require('../../middlewares/validateRequests');
const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({
  storage,
});

// Postioning of routes matter, let the specific routes come before general routes

// Special Route
router.get("/without-timelines", collectionController.getAll);


// this route wants the userId in body and collectionId in query params
router.get("/:id",checkWhenSomeoneisFetchigCollection,isPublicCheck,collectionController.get);

router.get("/", collectionController.getAllWithTimeline);
router.post("/", upload.single("image"), collectionController.create);
router.post('/togglePrivacy/:id',collectionController.togglePrivacy);
router.patch("/:id", upload.single("image"), collectionController.update);
router.delete("/:id", collectionController.deleteCollection);
router.post("/:id/upvote",collectionController.upvote);
router.post('/:id/downvote',collectionController.downvote);

module.exports = router;
