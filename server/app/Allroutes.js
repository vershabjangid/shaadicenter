const express = require('express');
const WebRoutes = require('./routes/web/AuthRoutes');
const AllRoutes = express.Router();
const session = require('express-session');
const Adminroutes = require('./routes/admin/AdminRoutes');
require('dotenv').config();

const registerSessionMiddleware = session({
    name: 'session',  // Custom cookie name
    secret: process.env.WEBSITESESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // Prevent JS access
        secure: false,   // Set to `true` in production (HTTPS)
        sameSite: 'lax', // Ensures cookies are sent correctly
        maxAge: 120 * 60 * 1000  // 30 minute
    }
})



const adminpanelSessionMiddleware = session({
    name: 'adminsession',  // Custom cookie name
    secret: process.env.ADMIN_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // Prevent JS access
        secure: false,   // Set to `true` in production (HTTPS)
        sameSite: 'lax', // Ensures cookies are sent correctly
        maxAge: 60 * 60 * 1000  // 1 hour
    }
})



AllRoutes.use(registerSessionMiddleware, WebRoutes)
AllRoutes.use(adminpanelSessionMiddleware, Adminroutes)


module.exports = AllRoutes