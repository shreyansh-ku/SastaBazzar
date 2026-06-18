import { Router } from "express";
import {
    getAllUsers,
    loginUser,
    // logoutUser,
    registerUser,
    verifyOTP,
} from "../controller/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// // Request
//    ↓
// VerifyJWT (user logged in?)
//    ↓
// admin (role = admin?)
//    ↓
// getAllUsers

router.get("/Allusers", verifyJWT , admin ,getAllUsers);
// router.post("/logout", verifyJWT, logoutUser);

//otp verfication==>
router.post("/verify-otp",verifyOTP);
export default router;