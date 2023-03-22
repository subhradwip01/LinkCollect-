const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DBPASS: process.env.MONGO_PASS,
  DBUSER: process.env.DB_USER,
  DBNAME: process.env.DB_NAME,
  DBCLUSTER: process.env.DB_CLUSTER,
  GOOGLECLIENTID: process.env.GOOGLE_CLIENT_ID,
  GOOGLECLIENTSECRET: process.env.GOOGLE_SECRET_API_KEY,
  GOOGLEREDIRECTURL: process.env.GOOGLE_REDIRECT_URI,
};
