const express = require("express");
const router = express.Router();
const UserControllers = require("../../controllers/userController");
const { googleAuth } = require("../../controllers/googleAuth");
const catchAsync = require("../../utils/catchAsync");
const {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
} = require("../../middlewares/authValidate");

router.post("/signup", validateUserAuthforSignUp, UserControllers.create);
router.get("/isauthenticated", UserControllers.isAuthenticated);
router.get("/verify-email", UserControllers.verifyEmailtoken);
router.get("/getById/:id", UserControllers.getByUserId);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);
router.delete("/delete/:id", UserControllers.destroy);
router.get("/getCollections/:id", UserControllers.getWithCollection);

// Google auth routes
router.get("/google-auth", catchAsync(googleAuth));

module.exports = router;
