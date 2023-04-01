const mongoose = require("mongoose");
const { DBURL } = require("./index");

const connect = async () => {
  try {
    await mongoose.connect(`${DBURL}`);
  } catch (err) {
    console.log(`Error in connecting the database ${err}`);
  }
};

module.exports = connect;
