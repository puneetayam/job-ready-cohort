/*
use case:
    - server create krna
    - server config krna

    - work in data processing with database:
        - Model: manages data flow in database
            - create schema
            - add schema and collection name in a model
            - export model
*/

const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require('cors');
const path = require("path")


const app = express(); // create express server instance


// Middleware
app.use(express.json()) // convert raw data to json data
app.use(cors());
app.use(express.static("./public")); // this will access all the files present in public folder

/* POST /notes -> create notes */
app.post("/notes", async (req, res) => {

    const { title, description } = req.body;

    await noteModel.create({
        title: title,
        description: description
    })

    const notes = await noteModel.find();

    res.status(201).json({
        message: "note created successfully",
        notes
    })

});

/* GET /notes -> get all notes */
app.get("/notes", async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({
        message: "fetched all notes",
        notes
    })
});

/* GET /notes/:id -> get note by id */
app.get("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const notes = await noteModel.find();

    res.status(200).json({
        message: "note fetched",
        notes
    })
});

/* DELETE /notes/:id -> delete note by id */
app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const deletedNote = await noteModel.findByIdAndDelete({ _id: id });

    res.status(204).json({
        message: `notes deleted ${id}`,
        deletedNote
    })
});

/* PATCH /notes/:id -> update note by id */
app.patch("/notes/:id", async (req, res) => {

    const id = req.params.id;
    const { title, description } = req.body;

    await noteModel.findByIdAndUpdate({ _id: id },
        {
            $set: {
                title: title,
                description: description
            }
        });

    const notes = await noteModel.find();

    res.status(200).json({
        message: "note id data is updated",
        notes
    })
});


// console.log(__dirname);
/* 
    output: 
        - E:\puneet\job-ready-cohort\Backend\day-8\Backend\src
        - till where it is use

    we need it to E:\puneet\job-ready-cohort\Backend\day-8\Backend\public\index.html
    so we have to move backward from src to public
    so use
        path.join(__dirname, "..", "/public/index.html")
*/
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"));
})

module.exports = app;