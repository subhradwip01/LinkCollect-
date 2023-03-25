const express = require("express");
const router = express.Router();
const UserControllers = require("../../controllers/userController");
const { googleAuth } = require("../../controllers/googleAuth");
const catchAsync = require("../../utils/catchAsync");
const {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
} = require("../../middlewares/authValidate");

// User routes should ideally have 3 routes
// signup, signin, logout ... and rest should be inside controller

router.post("/signup", validateUserAuthforSignUp, UserControllers.create);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);

// Can you Please add this to controller logic if possible
router.get("/verify-email", UserControllers.verifyEmailtoken);

// We can use a middleware instead of a route
router.get("/isauthenticated", UserControllers.isAuthenticated);

// No need, as the user email is there on client with jwt token
// router.get("/getById/:id", UserControllers.getByUserId);

// Delete request is not needed as localStorage.token = null is done on client side when using jwt token
// router.delete("/delete/:id", UserControllers.destroy);

// User route should only have user related routes, client should make request to collections routes for getting collection
// router.get("/getCollections/:id", UserControllers.getWithCollection);

// Google auth route for both signup and signin
router.get("/google-auth", catchAsync(googleAuth));

module.exports = router;
