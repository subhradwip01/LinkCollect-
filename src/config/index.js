const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  GOOGLECLIENTID: process.env.GOOGLE_CLIENT_ID,
  GOOGLECLIENTSECRET: process.env.GOOGLE_SECRET_API_KEY,
  GOOGLEREDIRECTURL: process.env.GOOGLE_REDIRECT_URI,
  DBURL: process.env.DBURL,
  SALT: process.env.ROUNDS,
  JWT_KEY: process.env.JWT_KEY,
  USER: process.env.USER_for_Email,
  PASS: process.env.PASS,
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  PORT: process.env.PORT,
  PRODUCTION: process.env.PRODUCTION,
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  PRODUCTION_FRONTEND_URL: process.env.PRODUCTION_FRONTEND_URL,
  CLIENT_ID_NodeMailer : process.env.client_id_NodeMailer,
  CLIENT_SECRET_NodeMailer : process.env.client_secret_NodeMailer,
  REFRESH_TOKEN : process.env.refresh_token,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};
