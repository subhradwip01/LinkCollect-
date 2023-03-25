const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PRODUCTION: process.env.PRODUCTION,
  DBURL: `mongodb+srv://${process.env.DB_USER}:${process.env.MONGO_PASS}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`,
  GOOGLECLIENTID: process.env.GOOGLE_CLIENT_ID,
  GOOGLECLIENTSECRET: process.env.GOOGLE_SECRET_API_KEY,
  GOOGLEREDIRECTURL: process.env.GOOGLE_REDIRECT_URI,
  SESSIONSECRET: process.env.SESSION_SECRET,
};
