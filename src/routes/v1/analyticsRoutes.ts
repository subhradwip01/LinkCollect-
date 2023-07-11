import express from "express";
import analyticsController from "../../controllers/analyticsController";

const router = express.Router();

router.get("/", analyticsController.getAll);

export default router;
