/*
use case:
    - server start krna
    - database se connect krna :
        - require package mongoose to connect with MongoDB database using URI.
        - cmd -> npm i mongoose
*/

const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Populates process.env from .env file

/* Connect to Database:- require package mongoose*/
function connectToDB() {

    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("connected to Database");
        })
        .catch(() => {
            console.log("failed to connect database")
        })
}

connectToDB();


/* Server start */
app.listen(process.env.PORT, () => {
    console.log(`server is running on port at ${process.env.PORT}.`);
})
