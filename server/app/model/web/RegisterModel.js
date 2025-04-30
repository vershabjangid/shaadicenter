const mongoose = require('mongoose');


const registerschema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true

    },
    Phone_No: {
        type: Number,
        required: true,
        unique: true
    },
    OTP_Value: {
        type: Number,
        required: true
    },
    Expires_At: {
        type: Number,
        required: true,
    },
    Is_verified: {
        type: Boolean,
        required: true,
    },
    Form_Status: {
        type: Number,
        required: true,
    },
    Permitted: {
        type: String,
        required: true
    }
}, { timestamps: true })


const registersmodel = mongoose.model('Register', registerschema);
module.exports = registersmodel;
