import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/user.model.js"
import bcrypt from "bcrypt"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";

//GAT AND GRT==>
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    //encrpt karwana
    const hashedPass = await bcrypt.hash(password, 10)


      //otp generate and mail-->
        const otp = Math.floor(100000 + Math.random() * 900000);

        const message = ` Welcome ${username} ! to SastaBazzar
       Your OTP for SastaBazzar registration is: ${otp}`;

        //MAIL-->
        await sendEmail(
    email,
    "SastaBazzar OTP Verification",
    message
);
    
    //register the User-->
    const user = await User.create({
    fullName,
    email,
    password: hashedPass,
    username: username.toLowerCase(),
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000,
    verified: false
})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

return res.status(201).json(
    new ApiResponse(
        201,
        {
            user: {
                _id: createdUser._id,
                fullName: createdUser.fullName,
                username: createdUser.username,
                email: createdUser.email,
                verified: createdUser.verified
            }
        },
        "User registered successfully. OTP sent to email."
    )
)
});


//login user-->
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (!user.isverified) {
        throw new ApiError(403, "Please verify your email first");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "Login successful"
        )
    );
});

//users--->

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});


//OTP verification

const verifyOTP=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body;
    if(!email || !otp){
throw new ApiError(404,"Email and OTP required!")
    }
    const user=await User.findOne({email});
    if(!user){
        throw new ApiError(404,"User Email not found")
    }
    if(user.otp !==otp){
        throw new ApiError(404,"Invalid Otp")
    }
    if(user.otpExpires < Date.now()){
 throw new ApiError(404,"Otp expired")
    }
    user.isverified=true;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Email verified successfully"
        )
    )
});


export {
    registerUser,
    loginUser,
    getAllUsers,
    verifyOTP,
}