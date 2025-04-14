let mongoose = require('mongoose');

let educationschema = mongoose.Schema({
    Education_Name: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: String,
        required: true
    }
}, { timestamps: true })

let educationmodel = mongoose.model('education', educationschema);
module.exports = educationmodel;