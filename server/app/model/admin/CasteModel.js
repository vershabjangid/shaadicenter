let mongoose = require('mongoose');

let casteschema = mongoose.Schema({
    Caste_Name: {
        type: String,
        required: true,
        unique: true
    },
    Religion: {
        type: String,
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


let castemodel = mongoose.model('caste', casteschema);
module.exports = castemodel;