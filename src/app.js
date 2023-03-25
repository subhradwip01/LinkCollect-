const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const session = require("express-session");
const connect = require("./config/database");
const { PORT } = require("./config/index");
const { sessionConfig } = require("./config/sessionConfig");
const ApiRoutes = require("./routes/index");
const { User, Timeline, Collection } = require("./models");

const setUpAndStartServer = async () => {
  app.use(session(sessionConfig));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(async (req, res, next) => {
    // const user = await User.findById(req.session.userId);

    // console.log(user);

    // const newCollection = await Collection.create({
    //   title: "Python",
    //   timeline: [],
    // });

    // const newTimeline = await Timeline.create({
    //   link: "xyz.com",
    //   time: "11/12/2025",
    //   note: `It's good`,
    // });

    // // Starting from bottom
    // newCollection.timeline.update(newTimeline);

    // user.collections.push(newCollection);

    // await user.save();

    // const newUser = await User.findById(req.session.userId).populate({
    //   path: "collections",
    //   populate: {
    //     path: "timeline",
    //   },
    // });

    // console.log(newUser);
    next();
  });

  app.use("/api", ApiRoutes);

  await connect();

  app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`);
  });
};

setUpAndStartServer();
