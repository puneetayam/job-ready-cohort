/*
- server create krna
- server config krna

- all the variable store in RAM.
*/

const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

/* POST /notes - create new note */
app.post("/notes", (req, res) => {

    notes.push(req.body);
    res.status(201).json({
        message: "note created successfully"
    })
})

/* GET /notes - get new note */
app.get("/notes", (req, res) => {

    res.status(200).json({
        notes: notes
    })
})

/* DELETE /notes/:index - delete node using index */
app.delete("/notes/:index", (req, res) => {

    delete notes[req.params.index];

    res.status(204).json({
        message: "note deleted successfully"
    })
})

/* PATCH /notes/:index - update note data */
app.patch("/notes/:index", (req, res) => {

    const index = req.params.index;
    notes[index].description = req.body.description;

    res.status(200).json({
        notes: notes
    })
})

module.exports = app;