/*
use case:
    - create schema
    - add schema and collection name in model
    - note :
        - collection name should be in plural
*/

const mongoose = require("mongoose");

// create note schema
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

// add collection and schema in model
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;