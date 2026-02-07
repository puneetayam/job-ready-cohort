const express = require("express");
const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {

        return res.status(409).json({
            message: "with this email, user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({ name, email, password: hash });

    /* note:
        - cookie cannot contain any sensitive data 
    */

    const token = jwt.sign({
        id: user._id,
        email: email
    },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "user registered succesfully",
        user
    })
});

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "this is protected route"
    })
})


/**
 * /api/user/login
 * controller -> another version of callback function
 *  - controller will act when login api hit request
 */

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "Invalid user"
        })
    }

    const isValidPassword = user.password === crypto.createHash("md5").update(password).digest("hex");

    if (!isValidPassword) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: email
    },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user
    })
})

/*
 - hashing is one way:

 - plain text to hash:
    - hash hamesha same hota h 
    - can be convert plain text to hash
    - but it is difficult to convert hash to plain text
 - encryption is two way 
*/
module.exports = authRouter;