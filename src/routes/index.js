// Import required modules
const express = require("express");
 // Create a new router instance
const router = express.Router();
 // Import API routes for version 1
const v1ApiRoutes = require("./v1/index");
 // Mount version 1 API routes on "/v1" path
router.use("/v1", v1ApiRoutes);
 // Invalid route handler
router.use((req, res, next) => {
  // Create a new error object
  const error = new Error("Invalid route");
  error.status = 404;
  next(error);
});
 // Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
 // Export the router
module.exports = router;