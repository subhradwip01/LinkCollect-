const express = require("express");
const { googleRedirect } = require("../../controllers/auth");
const { userLogout, getCurrentUser } = require("../../controllers/user");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router.get("/google-auth", catchAsync(googleRedirect));

router.get("/current-user", getCurrentUser);

router.get("/logout", catchAsync(userLogout));

module.exports = router;
