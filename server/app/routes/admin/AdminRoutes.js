const express = require('express');
const { Adminlogin, checkadminsession, viewadminusers, addreligion, viewallreligion, deletereligion, updatereligion, viewactivereligion, addcaste, viewcaste, deletecaste, viewactivecaste, updatecaste, addmothertongue, viewmothertongue, viewactivemothertongue, deletemothertongue, updatemothertongue, addregions, viewactivecountries, viewallcountries, viewactivestates, viewallstates, viewalldistricts, viewactivedistricts, deleteregion, updateregions, addeducation, vieweducation, viewactiveeducation, updateducation, deleteeducation, addoccupation, viewoccupation, viewactiveoccupation, updateoccupation, deleteoccupation, addwebsitetheme, updateuserspermit, viewadminuserprofile, deleteadminusers } = require('../../controller/admin/Admincontrollers');
const Adminroutes = express.Router()
const AdminToken = process.env.ADMINTOKEN;
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path')
const { viewuserprofile } = require('../../controller/web/WebAuth');
const { addhomebannercontroller, updatehomebanner, viewhomebanner, addhomecounter, viewhomecounters, deletecounters, Homewhychoosecontroller, viewhomewhychoose, deletehomewhychoose, updatehomewhychoose, Homefeaturedprofilecontroller, viewhomefeaturedprofile, deletehomefeaturedprofile, updatehomefeaturedprofile, Homesuccessstoriescontroller, viewhomesuccessstories, deletehomesuccessstories, updatesuccessstories } = require('../../controller/admin/HomeController');
const { addaboutbannercontroller, viewaboutbanner, updateaboutbanner, addaboutparagraphcontroller, viewaboutparagraph, addaboutsubparagraphcontroller, viewsubaboutparagraph } = require('../../controller/admin/AboutController');


let userAuth = (req, res, next) => {
    if (!req.session.Email) {
        return res.send({
            Status: 404,
            Message: "Unauthorized User"
        });
    }
    next();
};

let verifytoken = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        jwt.verify(token, AdminToken, (err, value) => {
            if (err) {
                res.send({
                    Status: 0,
                    Message: "Please enter Valid token"
                })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Please enter the token"
        })
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extension = path.extname(file.originalname);
            const filename = 'file' + uniquesuffix + extension;
            cb(null, filename)
        }
        else {
            const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            // const extension = path.extname(file.originalname);
            const filename = 'file' + uniquesuffix + ".fake";
            cb(null, filename)
        }
    }
})

const upload = multer({ storage: storage }).any('Banner_Image', 'Why_Choose_Card_Icon', 'Featured_Profile_Card_Image', 'Success_Stories_Card_Image', 'AboutBanner', 'AboutParagraphBanner')



Adminroutes.post('/admin-login', Adminlogin)
Adminroutes.post('/check-admin-session', checkadminsession)

// users routes 
Adminroutes.get('/view-admin-users', userAuth, verifytoken, viewadminusers)
Adminroutes.post('/view-admin-users-profile', userAuth, verifytoken, viewadminuserprofile)
Adminroutes.put('/update-users-permit', userAuth, verifytoken, updateuserspermit)
Adminroutes.delete('/delete-users-profile', userAuth, verifytoken, deleteadminusers)


//religion routes
Adminroutes.post('/add-religions', userAuth, verifytoken, addreligion)
Adminroutes.get('/view-religions', userAuth, verifytoken, viewallreligion)
Adminroutes.get('/view-active-religions', viewactivereligion)
Adminroutes.delete('/delete-religions', userAuth, verifytoken, deletereligion)
Adminroutes.put('/update-religions', userAuth, verifytoken, updatereligion)


//mother tongue routes
Adminroutes.post('/add-mothertongue', userAuth, verifytoken, addmothertongue)
Adminroutes.get('/view-mothertongue', userAuth, verifytoken, viewmothertongue)
Adminroutes.get('/view-active-mothertongue', viewactivemothertongue)
Adminroutes.delete('/delete-mothertongue', userAuth, verifytoken, deletemothertongue)
Adminroutes.put('/update-mothertongue', userAuth, verifytoken, updatemothertongue)


//caste routes
Adminroutes.post('/add-caste', userAuth, verifytoken, addcaste)
Adminroutes.get('/view-caste', userAuth, verifytoken, viewcaste)
Adminroutes.post('/view-active-caste', viewactivecaste)
Adminroutes.delete('/delete-caste', userAuth, verifytoken, deletecaste)
Adminroutes.put('/update-caste', userAuth, verifytoken, updatecaste)


//regions routes
Adminroutes.post('/add-regions', userAuth, verifytoken, addregions)
Adminroutes.get('/view-active-country', viewactivecountries)
Adminroutes.get('/view-all-country', userAuth, verifytoken, viewallcountries)
Adminroutes.post('/view-active-states', viewactivestates)
Adminroutes.get('/view-all-states', userAuth, verifytoken, viewallstates)
Adminroutes.get('/view-all-districts', userAuth, verifytoken, viewalldistricts)
Adminroutes.post('/view-active-districts', viewactivedistricts)
Adminroutes.put('/update-regions', userAuth, verifytoken, updateregions)
Adminroutes.delete('/delete-regions', userAuth, verifytoken, deleteregion)


// education routes 
Adminroutes.post('/add-education', userAuth, verifytoken, addeducation)
Adminroutes.get('/view-education', userAuth, verifytoken, vieweducation)
Adminroutes.get('/view-active-education', viewactiveeducation)
Adminroutes.put('/update-education', userAuth, verifytoken, updateducation)
Adminroutes.delete('/delete-education', userAuth, verifytoken, deleteeducation)



// occupation routes

Adminroutes.post('/add-occupation', userAuth, verifytoken, addoccupation)
Adminroutes.get('/view-occupation', userAuth, verifytoken, viewoccupation)
Adminroutes.get('/view-active-occupation', viewactiveoccupation)
Adminroutes.put('/update-occupation', userAuth, verifytoken, updateoccupation)
Adminroutes.delete('/delete-occupation', userAuth, verifytoken, deleteoccupation)


// theme routes 
Adminroutes.post('/website-theme', userAuth, verifytoken, addwebsitetheme)


//home page controller 
Adminroutes.post('/home-banner', userAuth, verifytoken, upload, addhomebannercontroller)
Adminroutes.get('/view-home-banner', viewhomebanner)
Adminroutes.put('/update-home-banner', userAuth, verifytoken, upload, updatehomebanner)

//home page counter controller 
Adminroutes.post('/add-homecounter', userAuth, verifytoken, addhomecounter)
Adminroutes.get('/view-homecounter', viewhomecounters)
Adminroutes.delete('/delete-homecounter', userAuth, verifytoken, deletecounters)


//home page why choose controller 
Adminroutes.post('/add-home-why-choose', userAuth, verifytoken, upload, Homewhychoosecontroller)
Adminroutes.get('/view-home-why-choose', viewhomewhychoose)
Adminroutes.delete('/delete-home-why-choose', userAuth, verifytoken, deletehomewhychoose)
Adminroutes.put('/update-home-why-choose', userAuth, verifytoken, upload, updatehomewhychoose)


//home page featured controller 
Adminroutes.post('/add-home-featured', userAuth, verifytoken, upload, Homefeaturedprofilecontroller)
Adminroutes.get('/view-home-featured', viewhomefeaturedprofile)
Adminroutes.delete('/delete-home-featured', userAuth, verifytoken, deletehomefeaturedprofile)
Adminroutes.put('/update-featured-profile', userAuth, verifytoken, upload, updatehomefeaturedprofile)




//home page success controller 
Adminroutes.post('/add-home-success', userAuth, verifytoken, upload, Homesuccessstoriescontroller)
Adminroutes.get('/view-home-success', viewhomesuccessstories)
Adminroutes.delete('/delete-home-success', userAuth, verifytoken, deletehomesuccessstories)
Adminroutes.put('/update-home-success', userAuth, verifytoken, upload, updatesuccessstories)


//about page controller 
Adminroutes.post('/add-about-banner', userAuth, verifytoken, upload, addaboutbannercontroller)
Adminroutes.get('/view-about-banner', viewaboutbanner)
Adminroutes.put('/update-about-banner', userAuth, verifytoken, upload, updateaboutbanner)


//about paragraph controller 
Adminroutes.post('/add-about-paragraph', userAuth, verifytoken, upload, addaboutparagraphcontroller)
Adminroutes.get('/view-about-paragraph', viewaboutparagraph)
// Adminroutes.put('/update-about-banner', userAuth, verifytoken, upload, updateaboutbanner)


//about sub paragraph controller 
Adminroutes.post('/add-about-sub-paragraph', userAuth, verifytoken, upload, addaboutsubparagraphcontroller)
Adminroutes.get('/view-about-sub-paragraph', viewsubaboutparagraph)

Adminroutes.post('/view-user-profile', userAuth, verifytoken, viewuserprofile)

module.exports = Adminroutes