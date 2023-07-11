import express from "express";
const router = express.Router();
import paymentController from "../../controllers/paymentController";

router.post("/create-checkout-session", paymentController.createCheckoutSession)



export default router;