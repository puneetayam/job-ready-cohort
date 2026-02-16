const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser()); // use to read the data from cookies
app.use("/api/auth", authRouter);

module.exports = app;