const express = require("express");
const followController = require("../controllers/follow.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const followRouter = express.Router();

/**
 * POST /api/users/follow/:username [protected]
 * - user A follow user B  => req.params = {followeeId : user B id}
*/
followRouter.post("/follow/:username", authMiddleware.identifyUser, followController.followUser);

/**
 * DELETE /api/users/follow/:username [protected]
 * - user A unfollow user B => req.params = {followeeId = user B id}
 */
followRouter.delete("/follow/:username", authMiddleware.identifyUser, followController.unfollowUser);


/**
 * PUT /api/users/follow/:username [protected]
 * description - user A follow user B with pending status and user B accepts or reject the follow request.
 */

followRouter.put("/follow/:username", authMiddleware.identifyUser, followController.respondToFollowRequest);

module.exports = followRouter;