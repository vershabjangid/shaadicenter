let mongoose = require('mongoose');

let residentialschema = mongoose.Schema({
    Sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'register'
    },
    Country: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Citizenship: {
        type: String,
        required: true
    },
    Address_Proof: {
        type: String,
        required: true
    }
}, { timestamps: true })


let residentialmodel = mongoose.model('residentialinfo', residentialschema);
module.exports = residentialmodel;