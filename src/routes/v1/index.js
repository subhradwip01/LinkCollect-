const express = require("express");
const router = express.Router();
const {validateUserAuthforSignIn,validateUserAuthforSignUp} = require('../../middlewares/authValidate');
const collectionController = require('../../controllers/collectionController');
const timelineController = require('../../controllers/timelineController');
const UserControllers = require('../../controllers/userController');


const userRoutes = require("./user");

router.use("/user", userRoutes);

//collection
router.post('/createCollection',collectionController.create);
router.delete('/deleteCollection/:id',collectionController.deleteCollection);
router.patch('/updateCollection/:id',collectionController.update)
router.get('/collection/:id',collectionController.get);
router.get('/collectionAll/:id',collectionController.getAll);
router.get('/CollwithTimeline',collectionController.getAllWithTimeline);

//timeline
router.post('/createTimeline',timelineController.create);
router.get('/getTimeline/:id',timelineController.getTimeline);
router.get('/getWholeTimeline/:id',timelineController.getThatTimeline);
router.delete('/deleteTimeline/:id',timelineController.deleteTimeline);
router.patch('/updateTimeline/:id',timelineController.updateTimeline);

//User
router.post('/signUp',validateUserAuthforSignUp,UserControllers.create); 
router.get('/isauthenticated',UserControllers.isAuthenticated);
router.get('/verify-email',UserControllers.verifyEmailtoken); 
router.get('/getById/:id',UserControllers.getByUserId) 
router.post('/signin',validateUserAuthforSignIn,UserControllers.signIn);
router.delete('/delete/:id',UserControllers.destroy); 
router.get('/getCollections/:id',UserControllers.getWithCollection);




module.exports = router;
