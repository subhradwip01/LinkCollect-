const express = require("express");
const router = express.Router();
const UserControllers = require("../../controllers/userController");
const { googleAuth } = require("../../controllers/googleAuth");
const catchAsync = require("../../utils/catchAsync");
const {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
} = require("../../middlewares/authValidate");

router.get("/get-user/:id", UserControllers.getByUserId);
router.post("/signup", validateUserAuthforSignUp, UserControllers.create);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);

// For email verification
router.get("/verify-email", UserControllers.verifyEmailtoken);

// We can use a middleware instead of a route
router.get("/isauthenticated", UserControllers.isAuthenticated);

// Google auth route for both signup and signin
router.get("/google-auth", catchAsync(googleAuth));

module.exports = router;
