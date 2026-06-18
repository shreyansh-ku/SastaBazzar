import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
    //database ke responses ko connectiomnInstance meh store kar leya
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        //Kon se URL se connect kara since production,testing etc ka bhi url hota hai
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
