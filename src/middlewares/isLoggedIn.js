// Needs to be added on all collection and timeline routes for authentication on each request
exports.isLoggedIn = (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({
      success: false,
      message: "Please Log In to Access it",
      err: "user not authenticated",
      data: {},
    });
  }
  next();
};
