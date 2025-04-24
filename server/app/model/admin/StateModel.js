let mongoose = require('mongoose');

let stateschema = mongoose.Schema({
    State_Name: {
        type: String,
        required: true,
        unqiue: true
    },
    Country_Name1: {
        type: String,
        required: true
    },
    State_Status: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true })


let statemodel = mongoose.model('states', stateschema);
module.exports = statemodel