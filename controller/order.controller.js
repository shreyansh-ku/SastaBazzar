import { Order } from "../model/order.model.js";
import { Product } from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";

// Place Order
const PlaceOrder = asyncHandler(async (req, res) => {

   const { items, address, paymentId } = req.body;

    if (!items || items.length === 0) {
        throw new ApiError(400, "Order items are required");
    }

    let totalAmount = 0;

    for (const item of items) {
        // product model ka use kara
        const product = await Product.findById(item.product);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        // Actual price database se aayegi.

        totalAmount += product.price * item.quantity;
    }

//  Actual price database se aayegi.
// Aur order me save bhi wahi price karo:

const orderItems = [];

for (const item of items) {
    const product = await Product.findById(item.product);

    orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
    });
}

const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    address,
    paymentId
});


const message = `
Hello ${req.user.fullName},

Your order has been placed successfully.

Order ID: ${order._id}
Total Amount: ₹${totalAmount}

Thank you for shopping with SastaBazaar!
`;

await sendEmail(
    req.user.email,
    "Order Placed Successfully",
    message
);
    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully"
        )
    );
});

// Admin - Get All Orders
const getAllOrders = asyncHandler(async (req, res) => {

// Saare orders — chahe kisi bhi user ke hon

const orders = await Order.find({})
.populate("items.product", "name price imageURL")
// sort by lattest order
.sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "All orders fetched successfully"
        )
    );
});


// User - Get My Orders
const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        // MongoDB me reference ID ko actual document data se replace karta hai
// Related collections ka data ek saath fetch karta hai
        user: req.user._id
    }).populate("items.product", "name price");

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "My orders fetched successfully"
        )
    );
});


// Admin - Update Order Status
const updateOrderStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;
    // order id se find karege
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.status = status;

    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order status updated successfully"
        )
    );
});

export {
    PlaceOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus
};