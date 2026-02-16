require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDB() {

    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to database.");
        })
        .catch((error) => {
            console.log("Failed to connect with database: ", error);
        })
}

module.exports = connectToDB;