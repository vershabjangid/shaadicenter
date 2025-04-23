let mongoose = require('mongoose');


let aboutbannerschema = mongoose.Schema({
    AboutBanner: {
        type: String,
        required: true
    },
    AboutBanner_Heading: {
        type: String,
        required: true
    },
    AboutBanner_Overlay: {
        type: String,
        required: true
    },
    AboutBanner_Overlay_Transparency: {
        type: Number,
        required: true
    },
    AboutHeading_Font_Bold: {
        type: Number,
        required: true
    },
    AboutHeading_Font_Size: {
        type: Number,
        required: true
    },
    AboutHeading_Text_Align: {
        type: String,
        required: true
    },
    AboutHeading_Text_Decoration: {
        type: String,
        required: true
    },
    AboutHeading_Text_Color: {
        type: String,
        required: true
    },
    AboutHeading_Line_Height: {
        type: Number,
        required: true
    }
})


let aboutbannermodel = mongoose.model('AboutBanner', aboutbannerschema);
module.exports = aboutbannermodel