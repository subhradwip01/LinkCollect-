const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Collection = require('./repository/collectionRepo');
const Timeline = require('./repository/timelineRepo');
const timelineRepo = new Timeline();
const collectionRepo = new Collection();

const connect = require("./config/database");
const { PORT } = require("./config/index");
const ApiRoutes = require("./routes/index");

const setUpAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  await connect();

    app.listen(PORT, async() => {
        console.log(`Server Started at ${PORT}`);
      //   const collection = await collectionRepo.create({
      //       title:""
      //   });
      //   console.log(collection);
      //   const timeline = await timelineRepo.create({
      //       Collection : collection.id,
      //       link :"www.ds.com",
      //       note:"hellopsdfsd",
      //       time:Date.now()
      //   })
      //   console.log(timeline);
      //  collection.timeline.push(timeline);
      //  await collection.save();
      //  console.log(collection);

    })
};

setUpAndStartServer();
