import express from "express";
import analyticsController from "../../controllers/analyticsController";

const router = express.Router();

router.get("/", analyticsController.getAll);

router.get("/live-message", analyticsController.getLiveMessage);

export default router;
