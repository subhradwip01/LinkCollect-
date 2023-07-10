const { User } = require("../models");

const isOwner = async (req, res, next) => {
  try {
    const isSameUser = false;
    console.log(req.params.username, "hello", req.body.username);
    const user = await User.findOne({ username: req.params.username });

    isSameUser;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: "Error checking if the user is the owner",
      data: {},
    });
  }
};

module.exports = isOwner;
