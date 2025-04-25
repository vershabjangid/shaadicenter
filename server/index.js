const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const cors = require('cors');
const AllRoutes = require('./app/Allroutes');
const cookieParser = require('cookie-parser')
require('dotenv').config();

app.use('/uploads', Express.static('uploads'))

app.use(cors({
    origin: ["http://localhost:3000", "https://shaadicenter.org", "https://www.shaadicenter.org"],// Allow frontend domain
    credentials: true // Allow cookies/session
}))

app.use(cookieParser());
app.use(Express.json())

app.use(AllRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/shaadi')
    .then(() => {
        app.listen('5000');
        console.log("server started")
    })
    .catch((error) => {
        console.log(error)
        console.log("server facing some error")
    })

