/*
use case:
    - server start krna
    - server ko database se connect krna
*/

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// connection with database
connectToDB();

// start server
app.listen(3000, () => {
    console.log("server is running on port at 3000");
})