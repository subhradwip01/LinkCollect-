const express = require("express");
const router = express.Router();
const collectionRoutes = require("./collectionRoutes");
const userRoutes = require("./userRoutes");
const timelineRoutes = require("./timelineRoutes");

//collection
router.use("/collection", collectionRoutes);

//timeline
router.use("/timeline", timelineRoutes);

//User
router.use("/user", userRoutes);

module.exports = router;
