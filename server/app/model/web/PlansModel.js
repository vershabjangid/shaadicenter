let mongoose = require('mongoose');

let plandetails = mongoose.Schema({
    User_Id: {
        type: String,
        required: true,
        unique: true
    },
    PackageName: {
        type: String,
        required: true
    },
    PackagePrice: {
        type: String,
        required: true
    },
    PackageValidity: {
        type: String,
        required: true
    },
    TransactionID: {
        type: String,
        required: true
    },
    PaymentScreenShot: {
        type: String,
        required: true
    }
})


let plansmodels = mongoose.model('plandetail', plandetails);
module.exports = plansmodels