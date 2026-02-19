const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageURL: {
        type: String,
        required: [true, "image url is required"]
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required to create post"]
    }
}, {
    timestamps: true
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;