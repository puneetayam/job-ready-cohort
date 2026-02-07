const mongoose = require("mongoose");
require("dotenv").config(); // populates data in process.env from .env file

function connectToDB() {

    /*
    error chances:
        - mongo_uri() :
            - @params:
                - string
            - @return:
                - string or undefined
        - make sure .env file present in root directly otherwise error undefined coming
        - solution:
                - check type:
                    - console.log(typeof process.env.MONGODB_URI);  
    */
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("connected to database."))
        .catch((error) => console.log(error))
}

module.exports = connectToDB;