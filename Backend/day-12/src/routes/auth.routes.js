require("dotenv").config();
const express = require("express");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {

        return res.status(409).json({
            message: "user already exists with this email"
        })
    }

    const user = await userModel.create({
        name, email, password
    });

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRETS
    )

    // set cookie in cookie storage without need of cookie-parser
    // question: why cookie parser package is use?
    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "user registered successfully",
        user
    })
})

module.exports = authRouter;