const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCTION: process.env.PRODUCTION,
  GOOGLECLIENTID: process.env.GOOGLE_CLIENT_ID,
  GOOGLECLIENTSECRET: process.env.GOOGLE_SECRET_CLOUDINARY_KEY,
  GOOGLEREDIRECTURL: process.env.GOOGLE_REDIRECT_URI,
  DBURL: process.env.DBURL,
  SALT: process.env.ROUNDS,
  JWT_KEY: process.env.JWT_KEY,
  USER: process.env.USER,
  PASS: process.env.PASS,
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
};
