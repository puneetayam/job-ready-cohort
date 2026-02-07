/*
use case:
    - create structure of note
    - model = folder, schema = structure

    - process:
        - require mongoose:
            - to create and manages data structure
        - create schema:
            - new Mongoose.Cchema({...})
        - Add two things in model:
            - Collection:
                - note: collection should be plural like note should be notes, product should be products
            - schema
            - mongoose.model(<collection_name>, <schema>)
        - export model
*/

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;