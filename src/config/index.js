const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    DBPASS : process.env.MONGO_PASS,
    DBUSER : process.env.DB_USER,
    DBNAME : process.env.DB_NAME
}