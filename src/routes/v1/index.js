const express = require("express");
const router = express.Router();
const collectionRoutes = require("./collectionRoutes");
const userRoutes = require("./userRoutes");
const timelineRoutes = require("./timelineRoutes");
const analyticsRoutes = require("./analyticsRoutes")
const paymentRoutes = require("./paymentRoutes")

//User
router.use("/user", userRoutes);

//collection
router.use("/collections", collectionRoutes);

//timeline
router.use("/collections/:id/timelines", timelineRoutes);

//Analytics
router.use("/analytics", analyticsRoutes)

//Stripe
router.use("/payments", paymentRoutes)

module.exports = router;
