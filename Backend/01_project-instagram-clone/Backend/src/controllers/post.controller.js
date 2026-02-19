require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPost(req, res) {

    /*
        without using multer middleware:
            - src: raw data
            - data-type: like json
            - req.body: undefined
        with using multer middleware:
            - src: form-data
            - data-type: files, or other data in form
            - req.body: have data
     */

    // console.log(req.body, req.file);
    // console.log(req.file.buffer);

    const userId = req.user.id;
    const { caption } = req.body;
    const image = req.file;

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(image.buffer), 'file'),
        fileName: 'Test',
        folder: "cohort-2-insta-clone-posts"
    });

    const post = await postModel.create({
        caption: caption,
        imageURL: file.url,
        userID: userId
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}


async function getAllPosts(req, res) {

    const userId = req.user.id;
    const posts = await postModel.findOne({ userID: userId });

    if (!posts) {
        return res.status(404).json({
            message: "no post found"
        })
    }

    res.status(201).json({
        message: "all posts fetched",
        posts
    })
}

async function getPostDetails(req, res) {

    const userID = req.user.id;
    const postID = req.params.postId;

    const post = await postModel.findById({ _id: postID });

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    // console.log(post.userID); // output: object id 
    // console.log(userID); // output: String

    if (!post.userID.equals(userID)) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    res.status(200).json({
        message: "post details fetched successfully",
        post
    })
}

async function likePost(req, res) {

    const postId = req.params.postId;
    const validPostId = await postModel.findById(postId);

    if (!validPostId) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isPostLikeAlready = await likeModel.findOne({
        $and: [
            { postId },
            { username: req.user.username }
        ]
    });

    if (isPostLikeAlready) {
        return res.status(409).json({
            message: "You already like this post."
        })
    }

    const likeRecord = await likeModel.create({
        postId: postId,
        username: req.user.username
    })

    res.status(200).json({
        message: "Post like successfully",
        likeRecord
    })
}

module.exports = {
    createPost,
    getAllPosts,
    getPostDetails,
    likePost
};