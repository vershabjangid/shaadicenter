let mongoose = require('mongoose');

let homewhychooseschema = mongoose.Schema({
    Sub_id: {
        type: String,
        required: true
    },
    Why_Choose_Card_Icon: {
        type: String,
        required: true
    },

    Why_Choose_Card_Section_Head_Text_Bold: {
        type: Number,
        required: true
    },
    Why_Choose_Card_Section_Head_Font_Size: {
        type: Number,
        required: true
    },
    Why_Choose_Card_Section_Head_Text_Align: {
        type: String,
        required: true
    },
    Why_Choose_Card_Section_Head_Text_Decoration: {
        type: String,
        required: true
    },
    Why_Choose_Card_Section_Home_Heading_Color: {
        type: String,
        required: true
    },
    Why_Choose_Card_Section_Head_Text_Line: {
        type: Number,
        required: true
    },
    Why_Choose_Card_Section_Home_Heading: {
        type: String,
        required: true
    },
    Why_Choose_Sub_Head_Text_Bold: {
        type: Number,
        required: true
    },
    Why_Choose_Sub_Head_Font_Size: {
        type: Number,
        required: true
    },
    Why_Choose_Sub_Head_Text_Align: {
        type: String,
        required: true
    },
    Why_Choose_Sub_Head_Text_Decoration: {
        type: String,
        required: true
    },
    Why_Choose_Sub_Home_Heading_Color: {
        type: String,
        required: true
    },
    Why_Choose_Sub_Head_Text_Line: {
        type: Number,
        required: true
    },
    Why_Choose_Card_Section_Sub_Home_Heading: {
        type: String,
        required: true
    }
}, { timestamps: true })

let homewhychoosemodel = mongoose.model('homewhychoose', homewhychooseschema)
module.exports = homewhychoosemodel