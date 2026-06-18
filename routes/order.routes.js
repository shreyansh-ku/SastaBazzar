import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import {  PlaceOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus
 } from "../controller/order.controller.js";
const router = Router();
router.route('/').post(verifyJWT,PlaceOrder).get(verifyJWT,admin,getAllOrders);
router.route('/myorders').get(verifyJWT,getMyOrders)
router.route('/:id/status').put(verifyJWT,admin,updateOrderStatus);

export default router;