const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require("../middlewares/auth.middleware");

const postRouter = express.Router();

/**
 * POST /api/posts/ [protected]
 */
postRouter.post("/", upload.single("image"), authMiddleware.identifyUser, postController.createPost);


/**
 * GET /api/posts/ [protected]
 * return all posts of respective user
 */
postRouter.get("/", authMiddleware.identifyUser, postController.getAllPosts);

/**
 * GET /api/posts/:postId [protected]
 * return specific post details
 */
postRouter.get("/:postId", authMiddleware.identifyUser, postController.getPostDetails);


/**
 * POST /api/posts/:postId [protected]
 * req.params = postId
 * description: user A like a post of user B and also like to your own post
 */
postRouter.post("/:postId", authMiddleware.identifyUser, postController.likePost);


module.exports = postRouter;