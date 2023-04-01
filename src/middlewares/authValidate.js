const validateUserAuthforSignUp = (req, res, next) => {
  //  console.log('middleware',req.body);
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Email ,name or password fields can't be empty!",
      err: "Email ,name or password is missing",
      data: {},
    });
  }
  next();
};
const validateUserAuthforSignIn = (req, res, next) => {
  //  console.log('middleware',req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Email or password fields can't be empty!",
      err: "Email or password is missing",
      data: {},
    });
  }
  next();
};

const validateisAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(404).json({
      success: false,
      data: {},
      err: "User id is not given",
      message: "Something went wrong",
    });
  }
  next();
};

const validateGrantRoleRequest = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.userid || !req.body.roleid) {
    return res.status(404).json({
      success: false,
      data: {},
      err: "userid or roleid are not given",
      message: "Something went wrong",
    });
  }
  next();
};

module.exports = {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
  validateisAdminRequest,
  validateGrantRoleRequest,
};
