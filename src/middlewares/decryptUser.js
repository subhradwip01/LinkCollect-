const jwt = require("jsonwebtoken");

// This middleware is on each and every request to append user to request object
exports.decryptUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next(); // req.userId will stay undefined

  try {
    const { userId, username } = jwt.decode(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = userId;
    req.username = username;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
