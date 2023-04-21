const express = require("express");
const router = express.Router();
const analyticsController = require("../../controllers/analyticsController");

router.get("/", analyticsController.getAll)

module.exports = router;