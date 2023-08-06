import express from "express";
const router = express.Router();
import UserControllers from "../../controllers/userController";
import { googleAuth } from "../../controllers/googleAuth";
import catchAsync from "../../utils/catchAsync";


import checkSpecialCharacters from "../../middlewares/checkSpecialCharacters";
import { validateUserAuthforSignIn, validateUserAuthforSignUp, userExist } from "../../middlewares/validateRequests";
import isOwner from '../../middlewares/isOwner';
import multer from "multer";
const upload = multer();

// This api is called by the user himself after login to set the user on client
router.get("/get-user/:id", UserControllers.getByUserId);
// Never use underscores
router.get("/get_user/:username",UserControllers.getByUsername);

//route for checking the availblity of a username
router.get("/check-username",checkSpecialCharacters,UserControllers.checkUsername);

router.post("/create_socials/:id",UserControllers.createSocials);
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


router.get("/setPremium", UserControllers.setPremium);


//giving error on local @TODO
// Update profile-pic Route
//router.update("/profile-pic",  upload.single("image"), UserControllers.updateProfilePic)


export default router;