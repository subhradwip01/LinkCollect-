import mongoose from "mongoose";
import config  from "./index";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    console.log(`Connecting to the database`);
    await mongoose.connect(`${process.env.DBURL}`);
    // const db = mongoose.connection;


  } catch (err) {
    console.log(`Error in connecting to the database ${err}`);
  }
};

export default connect;
