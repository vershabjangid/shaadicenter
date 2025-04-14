let mongoose = require('mongoose');

let mothertongueschema = mongoose.Schema({
    MotherTongue_Name: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


let mothertonguemodel = mongoose.model('mothertongue', mothertongueschema);
module.exports = mothertonguemodel;