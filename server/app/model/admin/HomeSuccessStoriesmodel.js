let mongoose = require('mongoose');

let homesuccessstoriesschema = mongoose.Schema({
    Sub_id: {
        type: String,
        required: true
    },
    Success_Stories_Card_Image: {
        type: String,
        required: true
    },


    Success_Stories_Card_Section_Name_Text_Bold: {
        type: Number,
        required: true
    },
    Success_Stories_Card_Section_Name_Font_Size: {
        type: Number,
        required: true
    },
    Success_Stories_Card_Section_Name_Text_Align: {
        type: String,
        required: true
    },

    Success_Stories_Card_Section_Name_Text_Decoration: {
        type: String,
        required: true
    },
    Success_Stories_Card_Section_Home_Name_Color: {
        type: String,
        required: true
    },
    Success_Stories_Card_Section_Name_Text_Line: {
        type: Number,
        required: true
    },
    Success_Stories_Card_Section_Name_Heading: {
        type: String,
        required: true
    },

    Success_Stories_Marriage_Date_Text_Bold: {
        type: Number,
        required: true
    },
    Success_Stories_Marriage_Date_Font_Size: {
        type: Number,
        required: true
    },
    Success_Stories_Marriage_Date_Text_Align: {
        type: String,
        required: true
    },
    Success_Stories_Marriage_Date_Text_Decoration: {
        type: String,
        required: true
    },
    Success_Stories_Marriage_Date_Color: {
        type: String,
        required: true
    },
    Success_Stories_Marriage_Date_Text_Line: {
        type: Number,
        required: true
    },
    Success_Stories_Card_Section_Marriage_Date_Heading: {
        type: String,
        required: true
    },
    Success_Stories_Description_Text_Bold: {
        type: Number,
        required: true
    },
    Success_Stories_Description_Font_Size: {
        type: Number,
        required: true
    },
    Success_Stories_Description_Text_Align: {
        type: String,
        required: true
    },
    Success_Stories_Description_Text_Decoration: {
        type: String,
        required: true
    },
    Success_Stories_Description_Color: {
        type: String,
        required: true
    },
    Success_Stories_Description_Text_Line: {
        type: Number,
        required: true
    },
    Success_Stories_Card_Section_Description_Heading: {
        type: String,
        required: true
    }
}, { timestamps: true })

let homesuccessstoriesmodel = mongoose.model('homesuccessstories', homesuccessstoriesschema)
module.exports = homesuccessstoriesmodel

