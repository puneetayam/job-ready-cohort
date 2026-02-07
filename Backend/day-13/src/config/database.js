require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to database")
        })
        .catch(() => {
            console.log("Failed to connect with database");
        })
}

module.exports = connectToDB;