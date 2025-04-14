let mongoose = require('mongoose');

let districtschema = mongoose.Schema({
    District_Name: {
        type: String,
        required: true,
        unique: true
    },
    Country_Name2: {
        type: String,
        required: true,
    },
    State_Name1: {
        type: String,
        required: true,
    },
    District_Status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


let districtmodel = mongoose.model('district', districtschema);
module.exports = districtmodel