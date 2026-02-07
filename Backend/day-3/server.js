const express = require("express");

const app = express();

/*
sample note
    {
        title : "test title",
        description : "test description"
    }
*/

app.use(express.json());

const notes = [];


app.post("/notes/createNote", (req, res) => {

    const note = req.body;
    notes.push(note);
    res.send("note created");
})

app.get("/notes/find/:title", (req, res) => {

    // res.send(req.params.title);

    const paramsTitle = req.params.title;
    const findNote = notes.find((note) => note.title === paramsTitle) || "no match found";
    res.send(findNote);
})


app.listen(3000, () => {
    console.log("server is running on port at 3000");
})