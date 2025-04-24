let mongoose = require('mongoose');

let occupationschema = mongoose.Schema({
    Occupation_Name: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: String,
        required: true
    }
}, { timestamps: true })

let occupationmodel = mongoose.model('occupation', occupationschema);
module.exports = occupationmodel;