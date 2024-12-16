import { Router } from "express"
import { registerUser, loginUser, logOutUser, updateInfo, changeCurrentPassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

// routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/info").patch(verifyJWT, updateInfo)
router.route("/change-password").patch(
    verifyJWT,
    changeCurrentPassword
)

export default router;