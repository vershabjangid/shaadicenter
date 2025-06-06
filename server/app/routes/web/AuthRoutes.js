const express = require('express');
const { registercontroller, verifyotp, resendOTP, checksession, createprofile, viewuserprofile, addresidentialinfo, logincontrol, findregisters, changepassword, logoutcontroller, headerdata, addprofessionaldetails, addfamilyinfocontroller, updateaboutmyself, updateaboutbasic, updateaboutprofessional, updateaboutcontact, updateaboutfamilydetails, updateprofilephoto } = require('../../controller/web/WebAuth');
const WebRoutes = express.Router();
let token = process.env.REGISTERTOKEN
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');
const { viewusers, SearchSortController, viewsearchprofile, senderandreceiverusername, sendintrestcontroller, viewintrests, updateinterests, deleteintrests } = require('../../controller/admin/SearchController');
const { sendmessages, getusers, viewmessages } = require('../../controller/admin/MessagesController');
const { premium, viewplans, viewuserplans } = require('../../controller/admin/HomeController');



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

const upload = multer({ storage: storage }).any('Profile_Picture', 'Address_Proof', 'PaymentScreenShot')


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
WebRoutes.post('/sort-search-users', userAuth, verifytoken, upload, SearchSortController)
WebRoutes.post('/search-user-profile', userAuth, verifytoken, upload, viewsearchprofile)
WebRoutes.post('/get-username', userAuth, verifytoken, upload, senderandreceiverusername)


WebRoutes.post('/send-interest', userAuth, verifytoken, upload, sendintrestcontroller)
WebRoutes.post('/user-intrests-data', userAuth, verifytoken, upload, viewintrests)
WebRoutes.put('/update-intrests-data', userAuth, verifytoken, upload, updateinterests)
WebRoutes.delete('/delete-intrests-data', userAuth, verifytoken, upload, deleteintrests)


WebRoutes.post('/send-messages', userAuth, verifytoken, upload, sendmessages)
WebRoutes.post('/view-chat-user', userAuth, verifytoken, upload, getusers)
WebRoutes.post('/view-chats', userAuth, verifytoken, upload, viewmessages)

WebRoutes.post('/payment', userAuth, verifytoken, upload, premium)
WebRoutes.post('/view-payment-history', userAuth, verifytoken, upload, viewuserplans)






module.exports = WebRoutes