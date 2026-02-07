/*
use case:
    - server start krna
    - database start krne ke liye call krna
*/

const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();

app.listen(3000, () => {
    console.log("server is running on port at 3000.");
})