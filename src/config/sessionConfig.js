const MongoStore = require("connect-mongo");
const { SESSIONSECRET, DBURL } = require(".");

// Initializing mongo store to save session data
const store = new MongoStore({
  mongoUrl: DBURL,
  secret: SESSIONSECRET,
  touchAfter: 24 * 60 * 60,
});

store.on("error", (e) => {
  console.log("Session store error", e);
});

exports.sessionConfig = {
  store,
  secret: SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
