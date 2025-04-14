let mongoose = require('mongoose');

let Religionschema = mongoose.Schema({
    Religion_Name: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


let religionmodel = mongoose.model('religions', Religionschema);
module.exports = religionmodel;