const express = require("express");
const router = express.Router();
const UserControllers = require("../../controllers/userController");
const { googleAuth } = require("../../controllers/googleAuth");
const catchAsync = require("../../utils/catchAsync");
const {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
  userExist,
} = require("../../middlewares/validateRequests");
const isOwner = require('../../middlewares/isOwner');
const multer = require("multer");
const upload = multer();

// This api is called by the user himself after login to set the user on client
router.get("/get-user/:id", UserControllers.getByUserId);
// Never use underscores
router.get("/get_user/:username",UserControllers.getByUsername);

//route for checking the availblity of a username
router.get("/check-username",UserControllers.checkUsername);


router.post(
  "/signup",
  validateUserAuthforSignUp,
  userExist,
  UserControllers.create
);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);

//toggle account privacy
router.post('/toggleAccount/:id', UserControllers.togglePrivacy);

// For email verification
router.get("/verify-email", UserControllers.verifyEmailtoken);

// We can use a middleware instead of a route
router.get("/isauthenticated", UserControllers.isAuthenticated);

// Google auth route for both signup and signin
router.get("/google-auth", catchAsync(googleAuth));


//giving error on local
// Update profile-pic Route
//router.update("/profile-pic",  upload.single("image"), UserControllers.updateProfilePic)

module.exports = router;
