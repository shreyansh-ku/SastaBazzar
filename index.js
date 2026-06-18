// require('dotenv').config() ki jagah yeh likho (confict resolve import and requre wala)
import dotenv from "dotenv";
import connectDB from "./Db/db.js";
import express from "express";
import userRouter from "./routes/user.routes.js"



//produts routes-->
import productRouter from "./routes/product.routes.js";

// order routes-->
import orderRouter from "./routes/order.routes.js";
// Payment routes-->
import paymentRouter from "./routes/payment.routes.js";
// analytics
import analyticRouter from "./routes/analytics.routes.js";

dotenv.config();


const app = express();
app.use(express.json());
//kaha pe listen karna hai
const PORT = process.env.PORT || 3000;

// DB connection--->
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// routes  /--->
app.get('/', (req, res) => {
	res.send('MERN server is running ');
});
//user-->
app.use("/api/v1/users", userRouter)
//function jesa hai (parameter,callback)

//postman meh test nhi ho raha tha therefore added this (debugging time)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//products-->
app.use("/api/v1/products",productRouter)

// orders-->
app.use("/api/v1/orders",orderRouter)

// payments-->
app.use("/api/v1/payment",paymentRouter)

// analytics-->
app.use("/api/v1/analytics",analyticRouter)

//for debugging
app.use((err, req, res, next) => {
    console.log("Multer field:", err.field);
    console.log("Error:", err);

    res.status(500).json({
        message: err.message,
        field: err.field
    });
});