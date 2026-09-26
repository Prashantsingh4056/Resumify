import express from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', registerUser)


/**
 * @route POST /api/auth/login
 * @description Login's a registered user with email and password
 * @access Public
 */
authRouter.post('/login', loginUser);


/**
 * @route GET /api/auth/logout
 * @description clear token from cookie and adds it into the blacklist
 * @access public
 */
authRouter.get('/logout', logoutUser);


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get('/get-me', authUser, getMe)

export default authRouter;