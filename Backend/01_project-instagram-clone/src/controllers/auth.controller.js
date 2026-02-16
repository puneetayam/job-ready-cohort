require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body;
    const isUserExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    /**
     * if user exists with email or username 
     *  - return user object
     * else
     *  - return null
     */


    if (isUserExists) {
        return res.status(409).json({
            message: "user already exists with same " + ((isUserExists.username === username) ? "username" : "email"),
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    );

    res.cookie("jwt_token", token, { expiresIn: "1d" });

    res.status(201).json({
        message: "user created successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res) {

    const { username, email, password } = req.body;

    /**
     * user will give two things:
     *  - 1-condition:
     *      - username and password
     *  - 2-condition:
     *      - email and password
     * but we are asking for 3 things:
     *  - username, email, password
     * 
     * condition-1: 
     * {username: "test", email: undefined, password: "test"} = req.body
     * 
     * condition-2:
     * {username: undefined, email: "test@test.com", password: "test"} = req.body
     */

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordValid = user.password === hash;

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

module.exports = {
    registerController,
    loginController
}