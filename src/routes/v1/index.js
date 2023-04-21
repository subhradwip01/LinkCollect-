const express = require("express");
const router = express.Router();
const collectionRoutes = require("./collectionRoutes");
const userRoutes = require("./userRoutes");
const timelineRoutes = require("./timelineRoutes");
const analyticsRoutes = require("./analyticsRoutes")

//User
router.use("/user", userRoutes);

//collection
router.use("/collections", collectionRoutes);

//timeline
router.use("/collections/:id/timelines", timelineRoutes);

//Analytics
router.use("/analytics", analyticsRoutes)

module.exports = router;
