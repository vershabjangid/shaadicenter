let mongoose = require('mongoose');

let AboutSubParagraphschema = mongoose.Schema({

    AboutSubParagraphHeading: {
        type: String,
        required: true
    },
    AboutParagraphSubHeading: {
        type: String,
        unique: true,
        required: true
    },
    AboutParagraphSubHeadingFontBold: {
        type: Number,
        required: true
    },
    AboutParagraphSubHeadingFontSize: {
        type: Number,
        required: true
    },
    AboutParagraphSubHeadingFontAlign: {
        type: String,
        required: true
    },
    AboutParagraphSubHeadingTextDecoration: {
        type: String,
        required: true
    },
    AboutParagraphSubHeadingFontColor: {
        type: String,
        required: true
    },
    AboutParagraphSubHeadingLineHeight: {
        type: Number,
        required: true
    }
})


let AboutSubParagraphModel = mongoose.model('aboutsubparagraph', AboutSubParagraphschema);
module.exports = AboutSubParagraphModel;