// routes/payment.routes.js
import { Router } from "express";
import { createRazorpayOrder,
     verifyPayment } from "../controller/payment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-order", verifyJWT, createRazorpayOrder);
router.post("/verify", verifyJWT, verifyPayment);

export default router;