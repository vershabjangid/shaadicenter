let mongoose = require('mongoose');


let createprofileschema = mongoose.Schema({

    Sub_id: {
        type: String,
        required: true,
        unique: true
    },
    Profile_For: {
        type: String,
        required: true
    },
    Full_Name: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Date_Of_Birth: {
        type: String,
        required: true
    },
    Height: {
        type: String,
        required: true
    },
    Religion: {
        type: String,
        required: true
    },
    Mother_Tongue: {
        type: String,
        required: true
    },
    Caste: {
        type: String,
        required: true
    },
    Profile_Picture: {
        type: String,
        required: true
    },
    About_Myself: {
        type: String,
        required: true
    },
    Marital_Status: {
        type: String,
        required: true
    },
    Body_Type: {
        type: String,
        required: true
    },
    Weight: {
        type: String,
        required: true
    },
    Physical_Status: {
        type: String,
        required: true
    },
    Eating_Habits: {
        type: String,
        required: true
    },
    Drinking_Habits: {
        type: String,
        required: true
    },
    Smoking_Habits: {
        type: String,
        required: true
    }
}, { timestamps: true })



let createprofilemodel = mongoose.model('profile_create', createprofileschema);
module.exports = createprofilemodel;