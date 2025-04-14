let mongoose = require('mongoose');

let Countryschema = mongoose.Schema({
    Country_Name: {
        type: String,
        required: true,
        unqiue: true
    },
    Country_Status: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true })


let countrymodel = mongoose.model('country', Countryschema);
module.exports = countrymodel