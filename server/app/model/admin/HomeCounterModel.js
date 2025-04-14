let mongoose = require('mongoose');


let homecounterschema = mongoose.Schema({
    Counter_Value: {
        type: String,
        required: true
    },
    Counter_Title: {
        type: String,
        required: true,
        unqiue: true
    }
}, { timestamps: true })


let homecountermodel = mongoose.model('homecounter', homecounterschema);
module.exports = homecountermodel;