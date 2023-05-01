const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connect = require("./config/database");
const { PORT } = require("./config/index");
const ApiRoutes = require("./routes/index");
const cors = require("cors");
const { decryptUser } = require("./middlewares/decryptUser");



const setUpAndStartServer = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(decryptUser);
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  app.use(limiter);

  app.use("/api", ApiRoutes);
  await connect();
  app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`);
  });
};

setUpAndStartServer();
