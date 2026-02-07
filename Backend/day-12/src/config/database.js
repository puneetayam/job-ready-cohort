require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to database.");
        })
        .catch(() => {
            console.log("failed to connect database.");
        })
}

module.exports = connectToDB;