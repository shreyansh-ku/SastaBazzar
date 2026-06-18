import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const admin=asyncHandler(async(req,_,next)=>{
    // Login hai?
    if(!req.user){
        throw new ApiError(401,"Invalid");
    }
    if(req.user.role!=="admin"){
        throw new ApiError(403,"User Lacks permission")
    }
    next();
})