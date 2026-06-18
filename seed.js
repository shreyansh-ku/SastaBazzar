// seed.js ek file hoti hai jo database me initial/fake/sample 
// data insert karne ke liye use hoti hai
import dotenv from "dotenv";
import connectDB from "./Db/db.js";

import { User } from "./model/user.model.js";
import { Product } from "./model/product.model.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Delete old data
        // await User.deleteMany({});
        // await Product.deleteMany({});

        // console.log("🗑️ Old data deleted");

        // Create Users (save() triggers password hashing middleware)
        const admin = new User({
            fullName: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        });

        const user = new User({
            fullName: "Shreyansh kumar",
            email: "user@example.com",
            password: "123456",
            role: "user"
        });

        await admin.save();
        await user.save();

        console.log("✅ Users created");

        // Create Products
        await Product.insertMany([
            {
                name: "iPhone 15",
                description: "Apple iPhone 15 128GB",
                price: 70000,
                category: "Mobiles",
                stock: 10,
                imageURL: "https://via.placeholder.com/300"
            },
            {
                name: "MacBook Air M3",
                description: "Apple MacBook Air M3 Laptop",
                price: 95000,
                category: "Laptops",
                stock: 5,
                imageURL: "https://via.placeholder.com/300"
            },
            {
                name: "Boat Airdopes",
                description: "Wireless Bluetooth Earbuds",
                price: 2000,
                category: "Accessories",
                stock: 20,
                imageURL: "https://via.placeholder.com/300"
            },
            {
                name: "Samsung Galaxy S24",
                description: "Samsung Flagship Smartphone",
                price: 75000,
                category: "Mobiles",
                stock: 15,
                imageURL: "https://via.placeholder.com/300"
            }
        ]);

        console.log("✅ Products created");
        console.log("🎉 Database seeded successfully");

        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding Error:", error);
        process.exit(1);
    }
};

seedData();