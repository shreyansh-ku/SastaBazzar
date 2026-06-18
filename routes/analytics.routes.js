import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import {getAdminStats} from "../controller/analytics.controller.js"
const router =Router();

router.get('/',verifyJWT,admin,getAdminStats)
export default router;