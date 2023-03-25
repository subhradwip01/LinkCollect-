const jwt = require("jsonwebtoken");

// This middleware is on each and every request to append user to request object
exports.decryptUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next(); // req.user will stay undefined

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(user);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
