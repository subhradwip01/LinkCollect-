import dotenv from "dotenv";
dotenv.config();

const GOOGLECLIENTID = process.env.GOOGLE_CLIENT_ID;
const GOOGLECLIENTSECRET = process.env.GOOGLE_SECRET_API_KEY;
const GOOGLEREDIRECTURL = process.env.GOOGLE_REDIRECT_URI;
const DBURL = process.env.DBURL;
const STRIPE_SIGNING_SECRET = process.env.STRIPE_SIGNING_SECRET;
const SALT = process.env.ROUNDS;
const JWT_KEY = process.env.JWT_KEY;
const USER = process.env.USER_for_Email;
const PASS = process.env.PASS;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const PORT = process.env.PORT;
const PRODUCTION = process.env.PRODUCTION;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
const PRODUCTION_FRONTEND_URL = process.env.PRODUCTION_FRONTEND_URL;
const CLIENT_ID_NodeMailer = process.env.client_id_NodeMailer;
const CLIENT_SECRET_NodeMailer = process.env.client_secret_NodeMailer;
const REFRESH_TOKEN = process.env.refresh_token;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const config = {
  GOOGLECLIENTID,
  GOOGLECLIENTSECRET,
  GOOGLEREDIRECTURL,
  DBURL,
  STRIPE_SIGNING_SECRET,
  SALT,
  JWT_KEY,
  USER,
  PASS,
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
  PORT,
  PRODUCTION,
  BACKEND_BASE_URL,
  PRODUCTION_FRONTEND_URL,
  CLIENT_ID_NodeMailer,
  CLIENT_SECRET_NodeMailer,
  REFRESH_TOKEN,
  STRIPE_SECRET_KEY,
};


export default config;

