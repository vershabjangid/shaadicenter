let mongoose = require('mongoose');

let homefeaturedprofileschema = mongoose.Schema({
    Sub_id: {
        type: String,
        required: true
    },
    Featured_Profile_Card_Image: {
        type: String,
        required: true
    },


    Featured_Profile_Card_Section_Name_Text_Bold: {
        type: Number,
        required: true
    },
    Featured_Profile_Card_Section_Name_Font_Size: {
        type: Number,
        required: true
    },
    Featured_Profile_Card_Section_Name_Text_Align: {
        type: String,
        required: true
    },

    Featured_Profile_Card_Section_Name_Text_Decoration: {
        type: String,
        required: true
    },
    Featured_Profile_Card_Section_Home_Name_Color: {
        type: String,
        required: true
    },
    Featured_Profile_Card_Section_Name_Text_Line: {
        type: Number,
        required: true
    },
    Featured_Profile_Card_Section_Name_Heading: {
        type: String,
        required: true
    },

    Featured_Profile_Age_Text_Bold: {
        type: Number,
        required: true
    },
    Featured_Profile_Age_Font_Size: {
        type: Number,
        required: true
    },
    Featured_Profile_Age_Text_Align: {
        type: String,
        required: true
    },
    Featured_Profile_Age_Text_Decoration: {
        type: String,
        required: true
    },
    Featured_Profile_Age_Color: {
        type: String,
        required: true
    },
    Featured_Profile_Age_Text_Line: {
        type: Number,
        required: true
    },
    Featured_Profile_Card_Section_Age_Heading: {
        type: Number,
        required: true
    },
    Featured_Profile_Location_Text_Bold: {
        type: Number,
        required: true
    },
    Featured_Profile_Location_Font_Size: {
        type: Number,
        required: true
    },
    Featured_Profile_Location_Text_Align: {
        type: String,
        required: true
    },
    Featured_Profile_Location_Text_Decoration: {
        type: String,
        required: true
    },
    Featured_Profile_Location_Color: {
        type: String,
        required: true
    },
    Featured_Profile_Location_Text_Line: {
        type: Number,
        required: true
    },
    Featured_Profile_Card_Section_Location_Heading: {
        type: String,
        required: true
    }
}, { timestamps: true })

let homefeaturedprofilemodel = mongoose.model('homefeaturedprofile', homefeaturedprofileschema)
module.exports = homefeaturedprofilemodel

