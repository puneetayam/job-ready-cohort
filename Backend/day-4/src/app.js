/**
 use of app.js file:
    - server create krna
    - server config krna
        - remember server start from server.js file.


    use case of req.body and req.params.something:
        - req.body = data large ho
        - req.params.something = data ek single value ho, here something means variable name which you mentioned in APIs.
 */

const express = require('express');

const app = express();  // server ka instance create ho jata h

app.use(express.json()); // convert raw data to json format for request and response data

const notes = [

    /*
        {
            title : "test title 1",
            description : "test description 1"
        }
    */
]

/* POST /notes - create new note */
app.post("/notes", (req, res) => {

    console.log(req.body);
    // notes.push(req.body); // for single note entry
    notes.push(...req.body); // for multiple note enteries
    res.send("note created");
});


/* GET /notes - retrieve notes */
app.get("/notes", (req, res) => {
    res.send(notes);
})

/* DELETE /notes/:index - delete note using index */
/* guidance: for delete the file in backend, koi bhi data kbhi bhi completely delete nhi hota, bs null se replace ho jata h */
app.delete("/notes/:index", (req, res) => {

    console.log(req.params);
    delete notes[req.params.index];
    console.log("note deleted successfully");
    res.send(notes);
})


/* PATCH /notes/:index - update note data using index */
app.patch("/notes/:index", (req, res) => {

    console.log(req.params);
    notes[req.params.index].description = req.body.description;
    res.send(notes[req.params.index]);

    console.log("note updated successfully");
})

module.exports = app; // app ko share kra h