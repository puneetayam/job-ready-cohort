/*
use case:
    - create notes model or schema
    - notes schema process:
        - require mongoose package
        - create schema
        - add created schema and collection in model
        - export model

    - why we need model:
        - To perform any operation in database, we need model

        - const model_name = mongoose.model(<collection_name>, <schema>);
        - for example:
            - const noteModel = mongoose.model("notes", noteSchema);

    - overview of database:
        - collection
            - schema : structure of the model
*/

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;