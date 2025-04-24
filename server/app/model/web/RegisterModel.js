const mongoose = require('mongoose');


const registerschema = mongoose.Schema({

    UserName: {
        type: String,
        required: true,
        unqiue: true
    },
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


const registersmodel = mongoose.model('register', registerschema);
module.exports = registersmodel;
