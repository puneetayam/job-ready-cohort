require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    // const hash = crypto.createHash("sha256").update(password).digest("hex");

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, { expiresIn: "1d" });

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

    /*
        - previous method using crypto:
        const hash = crypto.createHash("sha256").update(password).digest("hex");
    
        const isPasswordValid = user.password === hash;
     */

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, { expiresIn: "1d" });

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

async function getMe(req, res) {

    const user = await userModel.findById(user);

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            userId: user._id,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

module.exports = {
    registerController,
    loginController
}