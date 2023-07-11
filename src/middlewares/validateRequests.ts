import CollectionRepo from '../repository/collectionRepo';
import UserRepo from '../repository/userRepo';

const collectionRepo = new CollectionRepo();
const userRepo = new UserRepo();

export const validateUserAuthforSignUp = (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Email, name, or password fields can't be empty!",
        err: "Email, name, or password is missing",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error validating user authentication for sign-up",
      data: {},
    });
  }
};

export const validateUserAuthforSignIn = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Email or password fields can't be empty!",
        err: "Email or password is missing",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error validating user authentication for sign-in",
      data: {},
    });
  }
};

export const validateisAdminRequest = (req, res, next) => {
  try {
    if (!req.body.id) {
      return res.status(404).json({
        success: false,
        data: {},
        err: "User id is not given",
        message: "Something went wrong",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error validating admin request",
      data: {},
    });
  }
};

export const validateGrantRoleRequest = (req, res, next) => {
  try {
    if (!req.body.name || !req.body.userid || !req.body.roleid) {
      return res.status(404).json({
        success: false,
        data: {},
        err: "userid or roleid are not given",
        message: "Something went wrong",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error validating grant role request",
      data: {},
    });
  }
};

export const userExist = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const user = await userRepo.getByEmail(userEmail);
    if (user) {
      return res.status(400).json({
        success: false,
        err: "User already exists",
        message: "Please login, because this email already exists",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking if the user exists",
      data: {},
    });
  }
};

export const isPublicCheck = async (req, res, next) => {
  try {
    const userId = req.userId;
    const collection: any = await collectionRepo.get(req.params.id);
    if (!collection.isPublic && userId !== collection.userId) {
      return res.status(400).json({
        success: false,
        message: "Collection is not public",
        err: "Not a public collection",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking if the collection is public",
      data: {},
    });
  }
};

export const checkWhenSomeoneisFetchigCollection = async (req, res, next) => {
  try {
    const collectionId = req.params.id;
    const userId = req.userId;
    const collection: any = await collectionRepo.get(collectionId);
    const user = await userRepo.getByUserId(collection.userId);
    if (user.id !== userId && !user.isPublic) {
      return res.status(400).json({
        success: false,
        message: "User is not public",
        err: "Not a public user",
        data: {},
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking when someone is fetching the collection",
      data: {},
    });
  }
};

export default {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
  validateisAdminRequest,
  validateGrantRoleRequest,
  checkWhenSomeoneisFetchigCollection,
  userExist,
  isPublicCheck
};
