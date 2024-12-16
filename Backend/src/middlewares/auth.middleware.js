import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

const verifyJWT = AsyncHandler(async (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!token) {
        throw new ApiError(401, "Unauthorized request")
    };

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken) {
        throw new ApiError(401, "expired token")
    };

    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;
    next()
})

export default verifyJWT;