const express = require("express");
const { googleAuth } = require("../../controllers/googleAuth");
const { userLogout, getCurrentUser } = require("../../controllers/user");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router.get("/google-auth", catchAsync(googleAuth));

router.get("/current-user", getCurrentUser);

router.get("/logout", catchAsync(userLogout));

module.exports = router;
