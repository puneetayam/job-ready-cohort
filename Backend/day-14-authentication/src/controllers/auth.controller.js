require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

async function registerUser(req, res) {

    const { name, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(401).json({
            message: "with this email, user already exists."
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        email,
        name,
        password: hash
    });

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, { expiresIn: "1h" });

    res.status(200).json({
        message: "user registered successfully.",
        user
    })
}

async function getUserDetails(req, res) {

    const token = req.cookies.token;
    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

    const user = await userModel.findById({ _id: decoded.id });

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    res.status(200).json({
        message: "user details fetched successfully.",
        userDetails: {
            userName: user.name,
            email: user.email,
        }
    })

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "user not found",
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");
    const isValidPassword = user.password === hash;

    if (!isValidPassword) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, { expiresIn: "1h" });

    return res.status(200).json({
        message: "user loggedIn successfully.",
        loggedUser: {
            name: user.name,
            email: user.email
        }
    })
}

module.exports = {
    registerUser,
    getUserDetails,
    loginUser
};