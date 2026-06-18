import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../model/product.model.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js";import { User } from "../model/user.model.js";
;

const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({});

    if (products.length === 0) {
        throw new ApiError(404, "No products found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"
        )
    );
});

//params se ayegi
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            product,
            "Product fetched successfully"
        )
    );
});

//file upload ke leye multer middlerware


const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || !stock) {
        throw new ApiError(400, "All fields are required");
    }

    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Product image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

// console.log("IMAGE =", image);

// return res.json(image);
// saves to mongoDB
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        imageURL:image.secure_url
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product created successfully"
        )
    );
});


const updateProduct = asyncHandler(async (req, res) => {
     console.log("REQ BODY:", req.body);
console.log("REQ FILE:", req.file);
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }
   
    //if name same hua toh no change
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // Optional image update
    if (req.file?.path) {
        const image = await uploadOnCloudinary(req.file.path);

        if (!image) {
            throw new ApiError(400, "Image upload failed");
        }

        product.image = image.secure_url;
    }

    const updatedProduct = await product.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedProduct,
            "Product updated successfully"
        )
    );
});
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await product.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Product deleted successfully"
        )
    );
});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}