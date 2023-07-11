import bodyParser from "body-parser";
import express from "express";
import env from "./config/index";
import connect from "./config/database";
import ApiRoutes from "./routes/index";
import cors from "cors";
import { decryptUser } from "./middlewares/decryptUser";
import rateLimit from "express-rate-limit";
import paymentController from "./controllers/paymentController";

const app = express();
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

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  app.use(limiter);

  app.use("/api", ApiRoutes);
  await connect();
  app.listen(env.PORT, async () => {
    console.log(`Server Started at ${env.PORT}`);
  });
};

setUpAndStartServer();

// export {};
