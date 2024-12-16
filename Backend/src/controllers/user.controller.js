import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import AsyncHandler from "../utils/AsyncHandler.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return ({
            accessToken,
            refreshToken
        })
    } catch (error) {
        throw new ApiError(500, "something went wrong when generating accesstoken and refreshtoken")
    }
};

const registerUser = AsyncHandler(async (req, res) => {
    const { username, fullName, email, password } = req.body;;
    if (
        [username, fullName, email, password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(400, "All fields are Required")
    };

    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "username or email already exist")
    };

    const user = await User.create(
        {
            username,
            fullName,
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Internal server error while registering user")
    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "User Registered Successfully"
            )
        )

});

const loginUser = AsyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    if (!(email || username)) {
        throw new ApiError(401, "username or password must be required");
    }

    const user = await User.findOne(
        {
            $or: [{ email }, { username }]
        }
    );
    if (!user) {
        throw new ApiError(404, "user not found");
    };

    const isPasswordValidated = await user.isPasswordCorrect(password);
    if (!isPasswordValidated) {
        throw new ApiError(409, "Invalid credentials");
    };

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        SameSite: 'None',
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "user logged in Successfully")
        )

});

const logOutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out Successfully"))
});

const updateInfo = AsyncHandler(async (req, res) => {
    const { fullName, username } = req.body
    console.log(fullName, username)
    const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $set: {
                username: username,
                fullName: fullName,
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(200, { user }, "user updated successfully")
        )
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "user not found")
    }
    console.log(oldPassword, newPassword);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid old Password")
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(
            new ApiResponse(200, {}, "password changed successfully")
        )
});

export { registerUser, loginUser, logOutUser, updateInfo, changeCurrentPassword }