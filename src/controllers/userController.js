const { PRODUCTION, PRODUCTION_FRONTEND_URL } = require("../config");
const UserService = require("../services/userService");

const userService = new UserService()

const create = async (req, res) => {
  try {
    const response = await userService.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const togglePrivacy = async (req, res) => {
  try {
    const user = await userService.togglePrivacy(req.params.id);
    let isPublic;
    isPublic = user.isPublic ? "Public" : "Private";
    return res.status(201).json({
      success: true,
      message: `Successfully made your account ${isPublic}`,
      data: user,
      err: {},
    });

  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
}

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(201).json({
      message: "Successfully Signed In",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to sign-in",
      err: error,
      success: false,
      data: {},
    });
  }
};
const getByUserId = async (req, res) => {
  try {
    const response = await userService.getUserById(req.params.id);
    return res.status(201).json({
      message: "Successfully fetched the user",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to fetch",
      err: error,
      success: false,
      data: {},
    });
  }
};
const getWithCollection = async (req, res) => {
  try {
    const response = await userService.getWithCollection(req.userId);
    return res.status(201).json({
      message: "Successfully fetched the user",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to fetch",
      err: error,
      success: false,
      data: {},
    });
  }
};
const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "User is authenticated and token is verified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to sign-in",
      err: error,
      success: false,
      data: {},
    });
  }
};

const verifyEmailtoken = async (req, res) => {
  try {
    const response = await userService.verifyEmailtoken(req.query.token);
    // Changes on production
    const token = userService.createToken({ userId: response._id, username: response.username });

    if (PRODUCTION !== "production") {
      return res.redirect(`http://localhost:3000/login?token=${token}`);
    }
    return res.redirect(`${PRODUCTION_FRONTEND_URL}/login?token=${token}`);
    // return res.status(201).json({
    //   success: true,
    //   message: "email verified",
    //   data: response,
    //   err: {},
    // });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to verify the email",
      err: error,
      success: false,
      data: {},
    });
  }
};
const destroy = async (req, res) => {
  try {
    const response = await userService.destroy(req.params.id);
    return res.status(201).json({
      success: true,
      message: "deleted",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to delete the user",
      err: error,
      success: false,
      data: {},
    });
  }
};

const getByUsername = async(req,res) => {
  try {
    // here i am taking as a body but take it as req.userId
    const response = await userService.getByUsername(req.params.username,req.userId);
    return res.status(201).json({
      success: true,
      message: "Fetched the user Successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to fetch the user",
      err: error,
      success: false,
      data: {},
    });
  }
}

const updateProfilePic = async(req,res)=>{
  try{
  // Change to req.userId
   const { username, userId } = req;
   const profilePic = await userService.updateProfilePic({ profilePic: req.file.path, userId });
   
   return res.status(201).json({
     data: profilePic,
     success: true,
     message: "Successfully Updated Profile Picture",
     err: {},
   });
  } catch (error) {
   return res.status(500).json({
     data: {},
     success: false,
     message: "Not able to Update Profile Picture",
     err: error,
   });
 }
}

module.exports = {
  updateProfilePic,
  destroy,
  getWithCollection,
  create,
  getByUsername,
  signIn,
  togglePrivacy,
  isAuthenticated,
  verifyEmailtoken,
  getByUserId,
};
