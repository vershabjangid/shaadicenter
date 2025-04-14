let mongoose = require('mongoose');

let websitethemeschema = mongoose.Schema({
    WebsiteBackground: {
        type: String,
        required: true,
        unique: true
    },
    Text_color: {
        type: String,
        required: true,
        unique: true
    },
    Btn_Color1: {
        type: String,
        required: true,
        unique: true
    },
    Btn_Color2: {
        type: String,
        required: true,
        unique: true
    },
    Icons_Filter: {
        type: String,
        required: true,
        unique: true
    }
})


let websitethememodel = mongoose.model('theme', websitethemeschema);
module.exports = websitethememodel;