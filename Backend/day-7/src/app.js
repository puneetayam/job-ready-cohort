/*
use case: 
    - server creation
    - server config krna
    
    - perform crud operations:
        - process:
            - require model
            
*/

const express = require("express");
const app = express(); // created express server instance and store it in app variable

const noteModel = require("./models/notes.model.js");

// Middleware
app.use(express.json());

/* POST /notes - create user */
app.post("/notes", async (req, res) => {

    const { title, description } = req.body;

    const note = await noteModel.create({
        title: title,
        description: description
    });

    res.status(201).json({
        message: "note created successfully",
        note
    });
});


/* GET /notes - get all notes */
app.get("/notes", async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({
        message: "all notes fetched successfully",
        notes
    })
})


module.exports = app;