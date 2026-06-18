import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js";

//products-->
import { getProducts } from "../controller/product.controller.js";
import { getProductById } from "../controller/product.controller.js";
import { createProduct } from "../controller/product.controller.js";
import { deleteProduct } from "../controller/product.controller.js";
import { updateProduct } from "../controller/product.controller.js";
const router = Router();

// Ek url pe DO cheje chalana get pe getProducts functions chaalaoo and post pecreate
//all produts without login
router.route('/').get(getProducts).post(verifyJWT,admin,upload.single('image'),createProduct)

//specoific products by login 
//params pass kara-->

router.route('/:id').get(getProductById).put(verifyJWT,admin, upload.single('image'),updateProduct).delete(verifyJWT,admin,deleteProduct)
export default router;