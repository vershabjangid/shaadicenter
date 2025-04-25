const express = require('express');
const { registercontroller, verifyotp, resendOTP, checksession, createprofile, viewuserprofile, addresidentialinfo, logincontrol, findregisters, changepassword, logoutcontroller, headerdata, addprofessionaldetails, addfamilyinfocontroller, updateaboutmyself, updateaboutbasic, updateaboutprofessional, updateaboutcontact, updateaboutfamilydetails, updateprofilephoto } = require('../../controller/web/WebAuth');
const WebRoutes = express.Router();
let token = process.env.REGISTERTOKEN
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');
const { viewusers } = require('../../controller/admin/SearchController');



let userAuth = (req, res, next) => {
    if (!req.session._id) {
        return res.send({
            Status: 404,
            Message: "Unauthorized User"
        });
    }
    next();
};


let verifytoken = (req, res, next) => {
    let regsitertoken = req.headers['authorization']
    if (regsitertoken) {
        jwt.verify(regsitertoken, token, (err, value) => {
            if (err) {
                res.send({
                    Status: 0,
                    Message: "Your session has expired"
                })
            }
            else {
                next();
            }
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "please enter the token"
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

const upload = multer({ storage: storage }).any('Profile_Picture', 'Address_Proof')


WebRoutes.post('/register', registercontroller)
WebRoutes.post('/verify-register', verifyotp)
WebRoutes.post('/resend-otp', resendOTP)
WebRoutes.post('/check-user-session', checksession)
WebRoutes.post('/create-profile', userAuth, verifytoken, upload, createprofile)
WebRoutes.post('/add-professional', userAuth, verifytoken, addprofessionaldetails)
WebRoutes.post('/add-residential', userAuth, verifytoken, upload, addresidentialinfo)
WebRoutes.post('/add-family', userAuth, verifytoken, addfamilyinfocontroller)

WebRoutes.post('/login', logincontrol)
WebRoutes.post('/finduser', findregisters);
WebRoutes.put('/change-password', userAuth, verifytoken, changepassword)
WebRoutes.post('/logout', logoutcontroller)

WebRoutes.post('/header-data', userAuth, verifytoken, headerdata)
WebRoutes.post('/user-data', userAuth, verifytoken, viewuserprofile)
WebRoutes.put('/update-profile-picture', userAuth, verifytoken, upload, updateprofilephoto)
WebRoutes.put('/update-about-myself', userAuth, verifytoken, updateaboutmyself)
WebRoutes.put('/update-about-basic', userAuth, verifytoken, updateaboutbasic)
WebRoutes.put('/update-about-professional', userAuth, verifytoken, updateaboutprofessional)
WebRoutes.put('/update-about-residential', userAuth, verifytoken, updateaboutcontact)
WebRoutes.put('/update-about-family', userAuth, verifytoken, updateaboutfamilydetails)

WebRoutes.get('/search-users', userAuth, verifytoken, viewusers)

module.exports = WebRoutes