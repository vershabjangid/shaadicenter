let mongoose = require('mongoose')

let familyinfoschema = mongoose.Schema({
    Sub_id: {
        type: String,
        required: true,
        unqiue: true
    },
    Family_Values: {
        type: String,
        required: true
    },
    Family_Type: {
        type: String,
        required: true
    },
    Family_Status: {
        type: String,
        required: true
    },
    No_Of_Children: {
        type: String
    },
    Father_Name: {
        type: String,
        required: true
    },
    Mother_Name: {
        type: String,
        required: true
    },
    Father_Designation: {
        type: String,
        required: true
    },
    Mother_Designation: {
        type: String,
        required: true
    },
    No_Of_Brothers: {
        type: String,
        required: true
    },
    No_Of_Sisters: {
        type: String,
        required: true
    }
}, { timestamps: true })


let familyinfomodel = mongoose.model('familyinfo', familyinfoschema)
module.exports = familyinfomodel