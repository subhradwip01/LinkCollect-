const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connect = require("./config/database");
const { PORT } = require("./config");
const ApiRoutes = require("./routes/index");
const cors = require("cors");
const { decryptUser } = require("./middlewares/decryptUser");

const setUpAndStartServer = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(decryptUser);

  app.use("/api", ApiRoutes);

  await connect();

  app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`);
  });
};

setUpAndStartServer();
