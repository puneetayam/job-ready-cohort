const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 * valid followUser condition
 * - jo user aye h follower and followee kya vo valid user h
 * - ek user khud ko follow nhi kr skta
 * - ek user ek baar hi dusre user ko follow kr skta h
 * 
 */


async function followUser(req, res) {

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeValid = await userModel.findOne({ username: followeeUsername });

    if (!isFolloweeValid) {
        return res.status(401).json({
            message: "you try to follow, invalid user"
        })
    }

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isAlreadyBothFollow = await followModel.findOne({
        $and: [
            { follower: followerUsername },
            { followee: followeeUsername }
        ]
    })

    if (isAlreadyBothFollow) {
        return res.status(409).json({
            message: `you already follow ${isFolloweeValid.username}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(200).json({
        message: `${followerUsername} follows ${followeeUsername} successfully`,
        followRecord
    })
}


/**
 * valid unfollow User condition
 * - jo user aye h follower or followee kya vo valid user h
 * - ek user khud ko unfollow nhi kr skta
 * - ek user kisi bhi user ko ek baar hi unfollow kr skta h
 */
async function unfollowUser(req, res) {

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isValidFollowee = await userModel.findOne({ username: followeeUsername });

    if (!isValidFollowee) {
        return res.status(401).json({
            message: "you try to unfollow, invalid user"
        })
    }

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "you cannot unfollow yourself"
        })
    }

    const deleteFollowRecord = await followModel.findOneAndDelete({
        $and: [
            { follower: followerUsername },
            { followee: followeeUsername }
        ]
    });

    res.status(204).json({
        message: `${followerUsername} unfollows ${followeeUsername} successfully`,
        deleteFollowRecord
    })
}


async function respondToFollowRequest(req, res) {

    const followerUsername = req.params.username;
    const followeeUsername = req.user.username;
    const { status } = req.body;

    if ((status !== 'pending') && (status !== "accepted") && (status !== "rejected")) {
        return res.status(400).json({
            message: "Invalid status"
        })
    }

    if (status === "pending") {
        return res.status(409).json({
            message: "status is already pending"
        })
    }

    const followRequest = await followModel.findOneAndUpdate({
        $and: [
            { follower: followeeUsername },
            { followee: followerUsername }
        ],
    },
        { status: status },
        { runValidators: true }
    )

    res.status(200).json({
        message: "status updated successfully",
        followRequest: await followModel.findById(followRequest._id)
    })

}

module.exports = {
    followUser,
    unfollowUser,
    respondToFollowRequest
}