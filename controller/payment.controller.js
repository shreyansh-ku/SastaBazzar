
import razorpay from "../utils/payment.js";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Step 1: Razorpay order banao
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body; // amount in rupees

    if (!amount) {
        throw new ApiError(400, "Amount is required");
    } 

    const options = {
        amount: amount * 100, // Razorpay paisa me leta hai (₹1 = 100 paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };

    // razorpay.orders.create() — Razorpay ke server pe ek pending bill register karta hai,]
    //  aur ek unique ID deta hai jisse frontend payment complete kar sake.

    const razorpayOrder = await razorpay.orders.create(options);

    return res.status(200).json(
        new ApiResponse(200, razorpayOrder, "Razorpay order created")
    );
});

// Step 2: Payment verify karo
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Signature verify karo — yeh confirm karta hai payment genuine hai
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new ApiError(400, "Payment verification failed — invalid signature");
    }

    // ✅ Payment genuine hai — ab apna order place karo
    return res.status(200).json(
        new ApiResponse(200, { paymentId: razorpay_payment_id }, "Payment verified successfully")
    );
});

export { createRazorpayOrder,
     verifyPayment };