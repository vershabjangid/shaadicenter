let mongoose = require('mongoose');


let intrestschema = mongoose.Schema({
    SenderName: {
        type: String,
        required: true
    },
    SenderUserName: {
        type: String,
        required: true
    },
    ReceiverName: {
        type: String,
        required: true
    },
    ReceiverUserName: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Permitted: {
        type: String,
        required: true
    }
}, { timestamps: true })


let intrestmodel = mongoose.model('interest', intrestschema);
module.exports = intrestmodel;