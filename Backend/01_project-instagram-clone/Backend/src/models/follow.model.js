const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    followee: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, { timestamps: true });

/**
 * - compound index
 * - unique true means follower only follows followee one and store in database, duplicate entries not stored in db.
 * -Kaam karne ka tarika:
 *  - Tez Search: Jab aap findOne({ follower: 'Abhishek', followee: 'Sneha' }) query karte hain, toh MongoDB ko pura database scan nahi karna padta. Woh seedha "Abhishek" waale section mein jata hai aur wahan se "Sneha" ko turant dhund leta hai.
 *  -Sorting: Ye data ko pehle follower ke hisab se sort karta hai, aur phir har follower ke andar uske followee ko sort karta hai.
 */

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;