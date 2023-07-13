import express from "express";
const router = express.Router();
import v1ApiRoutes from "./v1/index";

router.use("/v1", v1ApiRoutes);

router.use((req: any, res: any, next: any) => {
  const error = new Error("Invalid route");
  res.status = 404;
  next(error);
});

router.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default router;
