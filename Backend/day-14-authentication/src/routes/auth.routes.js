const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

/**
 *  POST /api/auth/register
 *  - create new user
 */

authRouter.post("/register", authController.registerUser);

/**
 * GET /api/auth/get-me
 * - return user details
 */

authRouter.get("/get-me", authController.getUserDetails);

/**
 * GET /api/auth/login
 * - return user if condition met.
 */

authRouter.get("/login", authController.loginUser);

module.exports = authRouter;