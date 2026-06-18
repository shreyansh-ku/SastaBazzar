import dotenv from "dotenv";
dotenv.config();
// jaha bhi procees.env hoga usse phle yeh import karna hoga

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
// awaitt
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto"
      }
    );

    console.log("File uploaded on Cloudinary:", response.secure_url);

    fs.unlinkSync(localFilePath);

    return response;

  } catch (error) {
    console.log("Cloudinary Error:", error);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};