let mongoose = require('mongoose');

let professionalschema = mongoose.Schema({
    Sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'register'
    },
    Highest_Education: {
        type: String,
        required: true
    },
    Education_Details: {
        type: String,
        required: true
    },
    Institution_Name: {
        type: String,
        required: true
    },
    Occupation_Name: {
        type: String,
        required: true
    },
    Occupation_Details: {
        type: String
    },
    Organization_Name: {
        type: String,
        required: true
    },
    Sector: {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    }
}, { timestamps: true })


let professionalmodel = mongoose.model('ProfessionalModel', professionalschema);
module.exports = professionalmodel