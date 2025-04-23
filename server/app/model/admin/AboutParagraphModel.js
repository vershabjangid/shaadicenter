let mongoose = require('mongoose');

let AboutParagraphschema = mongoose.Schema({
    AboutParagraphBanner: {
        type: String
    },
    AboutParagraphHeading: {
        type: String,
        unique: true,
        required: true
    },
    AboutParagraphHeadingFontBold: {
        type: Number
    },
    AboutParagraphHeadingFontSize: {
        type: Number
    },
    AboutParagraphHeadingFontAlign: {
        type: String
    },
    AboutParagraphHeadingTextDecoration: {
        type: String
    },
    AboutParagraphHeadingFontColor: {
        type: String
    },
    AboutParagraphHeadingLineHeight: {
        type: Number
    }
}, { timestamps: true })


let AboutParagraphModel = mongoose.model('aboutparagraph', AboutParagraphschema);
module.exports = AboutParagraphModel;