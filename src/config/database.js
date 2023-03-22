const mongoose = require("mongoose");
const { DBPASS, DBUSER, DBNAME, DBCLUSTER } = require("./index");

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DBUSER}:${DBPASS}@${DBCLUSTER}.mongodb.net/${DBNAME}?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(`Error in connecting the database ${err}`);
  }
};

module.exports = connect;
