
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// analytics meh
import { User } from "../model/user.model.js";
import { Product } from "../model/product.model.js";
import { Order } from "../model/order.model.js";

const getAdminStats = asyncHandler(async (req,res) => {
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});
    const totalUsers = await User.countDocuments({role:'user'});

    const orders=await Order.find({});
    
    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue
            },
            "Admin stats fetched"
        )
    );
});

export {
    getAdminStats,
};