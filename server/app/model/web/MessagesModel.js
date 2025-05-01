let mongoose = require('mongoose');

let messageschema = mongoose.Schema({
    User_id: {
        type: String,
        required: true
    },
    Sender: {
        type: String,
        required: true
    },
    Receiver: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Check: {
        type: String,
        required: true
    }
}, { timestamps: true })

let messagesmodel = mongoose.model('message', messageschema)
module.exports = messagesmodel;