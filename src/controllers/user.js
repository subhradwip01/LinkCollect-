const User = require("../models/user");

exports.getCurrentUser = async (req, res) => {
  console.log(req.session);
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    console.log(user);
    return res.send(user);
  }

  return res.sendStatus(200);
};

exports.userLogout = async (req, res) => {
  req.session.userId = null;

  return res.sendStatus(200);
};
