/*
use case:
    - server create krna
    - server config krna
*/

const express = require('express');
const app = express();  // express server instance is created
const noteModel = require("./models/notes.model");

// middleware 
app.use(express.json());

/* POST /notes : create notes */
app.post("/notes", async (req, res) => {

    const { title, description } = req.body;

    const note = await noteModel.create({
        title: title,
        description: description,
    });

    // status code "201" -> new data is created
    res.status(201).json({
        message: "note created successfully",
        note
    })
});

/* GET /notes : get all notes */
app.get("/notes", async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({
        message: "fetched all notes",
        notes
    })
});

/* GET /notes/:title -> get notes by specific title */
app.get("/notes/:title", async (req, res) => {

    const title = req.params.title;

    const note = await noteModel.find({ title: title });

    const noteMessage = note.length === 0 ? "note not found" : "note found";

    res.status(200).json({
        message: noteMessage,
        note
    })
})

/* DELETE /notes/:title -> delete the specific note using title*/
app.delete("/notes/:title", async (req, res) => {

    const title = req.params.title;
    await noteModel.findOneAndDelete({ title: title });
    const notes = await noteModel.find();

    res.status(200).json({
        message: "note deleted",
        notes
    })
})


/* PATCH /notes/:title -> update note description using title*/
app.patch("/notes/:title", async (req, res) => {

    const title = req.params.title;
    const { description } = req.body;
    await noteModel.findOneAndUpdate({ title: title }, { $set: { description: description } });

    const updatedNote = await noteModel.findOne({ title: title });

    res.status(200).json({
        message: "description update successfully",
        updatedNote
    })
})

module.exports = app;