const express = require("express");
const router = express.Router();
const UserControllers = require("../../controllers/userController");
const { googleAuth } = require("../../controllers/googleAuth");
const catchAsync = require("../../utils/catchAsync");
const {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
  userExist,
  isPublicUserCheck
} = require("../../middlewares/validateRequests");

router.get("/get-user/:id",isPublicUserCheck,UserControllers.getByUserId);
router.post(
  "/signup",
  validateUserAuthforSignUp,
  userExist,
  UserControllers.create
);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);
router.post('/toggleAccount/:id',UserControllers.togglePrivacy);

// For email verification
router.get("/verify-email", UserControllers.verifyEmailtoken);

// We can use a middleware instead of a route
router.get("/isauthenticated", UserControllers.isAuthenticated);

// Google auth route for both signup and signin
router.get("/google-auth", catchAsync(googleAuth));

module.exports = router;
