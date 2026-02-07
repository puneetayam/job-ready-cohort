/*
use case:
    - database connection code

    - process to connect database:
        - require mongoose package:
            - manages the data transfer from server to database
            - creating the new object it generates a unique id and send it to database
        - connect with database uri
*/

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // populate data in process.env from .env file

function connectToDB() {

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("connected to database.");
        })
        .catch(() => {
            console.log("failed to connect with database");
        })
}

module.exports = connectToDB;