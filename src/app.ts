import bodyParser from "body-parser";
import express from "express";
import env from "./config/index";
import connect from "./config/database";
import ApiRoutes from "./routes/index";
import cors from "cors";
import { decryptUser } from "./middlewares/user/decryptUser";
import rateLimit from "express-rate-limit";
import paymentController from "./controllers/paymentController";
import http from "http";
import cron from 'node-cron';
import cronSchedule from "./utils/cron-jobs/cronJobs";
const app = express();

// import {Socket, Server} from "socket.io";
import { Server, Socket } from "socket.io";
// socket io imports
import {ConnectSocketIo} from "./events/io"
// import {createRedisClient} from './utils/redis/redis'

const setUpAndStartServer = async () => {

  app.use(cors());

  // This route needs to be above express body parser
  // as we need the req as a stream rather than a parsed object
  app.use(
    "/api/v1/stripe-webhook",
    express.raw({ type: "application/json" }),
    paymentController.webhook
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(decryptUser);


  // rate limiter 
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    keyGenerator: (req: any, res: any) => {
      return req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.headers['x-forwarded-for']  // IP address from nginx proxy config
    }

  });
  app.use(limiter);
  app.use("/api", ApiRoutes);
  // app.get('/ip', (request, response) => response.send(request.headers['x-real-ip']))

  await connect();
  const server = http.createServer(app);

  server.listen(env.PORT, async () => {
    console.log(`Server Started at ${env.PORT}`);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      // origin: "https://linkcollect.io", // production
    },
  });

  const onConnection = (socket) => {
    console.log("here")
    ConnectSocketIo(io, socket);

  }

  io.on("connection", onConnection);

  // schedule tasks to be run on the server
  //  cronSchedule(cron);
  //  await createRedisClient()


}; 

setUpAndStartServer();

export default app;
// export {};
