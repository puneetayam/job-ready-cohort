/*
use case:
    - database connection function
        - process:
            - require mongoose package
            - write code connectToDB()
            - export connectToDB()
*/
require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to database.");
        })
        .catch(() => {
            console.log("Failed to connect database.")
        })
}

module.exports = connectToDB;