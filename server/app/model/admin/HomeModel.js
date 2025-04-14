let mongoose = require('mongoose');

let homebannerschema = mongoose.Schema({
    // banner Schema
    Banner_direction: {
        type: String,
        required: true
    },
    Banner_Image: {
        type: String,
        required: true
    },
    // heading Schema
    Heading: {
        type: String,
        required: true
    },
    // heading functionality
    Heading_Font_Bold: {
        type: Number,
        required: true
    },
    Heading_Font_Size: {
        type: Number,
        required: true
    },
    Heading_Text_Align: {
        type: String,
        required: true
    },
    Heading_Text_Decoration: {
        type: String,
        required: true
    },
    Heading_Text_Color: {
        type: String,
        required: true
    },
    Heading_Line_Height: {
        type: Number,
        required: true
    },
    //sub heading Schema
    Sub_Heading: {
        type: String,
        required: true
    },
    //sub heading functionality
    Sub_Heading_Font_Bold: {
        type: Number,
        required: true
    },
    Sub_Heading_Font_Size: {
        type: Number,
        required: true
    },
    Sub_Heading_Text_Align: {
        type: String,
        required: true
    },
    Sub_Heading_Text_Decoration: {
        type: String,
        required: true
    },
    Sub_Heading_Text_Color: {
        type: String,
        required: true
    },
    Sub_Heading_Line_Height: {
        type: Number,
        required: true
    }

}, { timestamps: true })


let homebannermodel = mongoose.model('homebanner', homebannerschema)
module.exports = homebannermodel