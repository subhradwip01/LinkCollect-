import express from "express";
const router = express.Router();
import v1ApiRoutes from "./v1/index";
import { AuthenticatedRequest, IResponse, INextFunction } from "interface/Request";
router.use("/v1", v1ApiRoutes);

router.use((err: any,req: AuthenticatedRequest , res: IResponse, next: any) => {
  const error = new Error("Invalid route");
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
  next(error);
});

router.use((err: any, req: AuthenticatedRequest, res: IResponse, next: INextFunction ) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default router;
