const express = require("express");

const app = express(); // create a server instance

app.get("/", (req, res) => res.send("Hello world"));

app.get("/about", (req, res) => res.send("About page open..."));

app.listen(3000, () => console.log("server is running on 3000")); // start a server