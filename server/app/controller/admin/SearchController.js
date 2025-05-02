const createprofilemodel = require("../../model/web/CreateProfileModel")
const familyinfomodel = require("../../model/web/FamilyModel")
const professionalmodel = require("../../model/web/ProfessionalModel")
const RegisterModel = require("../../model/web/RegisterModel")
const residentialmodel = require("../../model/web/Residentialinfo")
const intrestmodel = require("../../model/web/SendInterestModel")

// users controller 
exports.viewusers = async (req, res) => {

    try {
        var viewregister = await RegisterModel.find().select(["-Password", "-OTP_Value", "-Permitted", "-Expires_At", "-Is_verified", "-Email", "-Phone_No", "-Form_Status", "-createdAt", "-updatedAt"])
        var profiledata = await createprofilemodel.find()
        var professionaldata = await professionalmodel.find()
        var residentialdata = await residentialmodel.find()
        let finalfetch = [[...profiledata], [...professionaldata], [...residentialdata], "https://api.shaadicenter.org/uploads/"]
        res.send(finalfetch)
    }
    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}



exports.SearchSortController = async (req, res) => {
    let data = {
        AgeFrom: req.body.AgeFrom,
        AgeTo: req.body.AgeTo,
        Marital_Status: req.body.Marital_Status,
        Religion: req.body.Religion,
        Caste: req.body.Caste,
        Mother_Tongue: req.body.Mother_Tongue
    }
    console.log(data)
    if (data.AgeTo < data.AgeFrom) {
        res.send({
            Status: 0,
            Message: "Invalid Age"
        })
        console.log({
            Status: 0,
            Message: "Invalid Age"
        })
    }
    else {

        let viewdata = await createprofilemodel.find({ Marital_Status: data.Marital_Status, Religion: data.Religion, Caste: data.Caste, Mother_Tongue: data.Mother_Tongue })
        let filterdata = viewdata.filter((e) => e.Age <= data.AgeTo && e.Age >= data.AgeFrom)
        res.send(filterdata)
        // console.log(viewdata.filter((e) => e.Age <= data.AgeTo && e.Age >= data.AgeFrom || e.Religion == data.Religion || e.Marital_Status.includes(data.Marital_Status) || e.Marital_Status.toLowerCase().includes(data.Marital_Status) || e.Religion.includes(data.Religion)))
    }

}




exports.viewsearchprofile = async (req, res) => {
    try {
        let data = {
            UserName: req.body.UserName || ""
        }
        if (data.UserName === undefined || data.UserName === "") {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            var profiledata = await createprofilemodel.findOne({ UserName: data.UserName }).select(['-Profile_For'])
            var professionaldata = await professionalmodel.findOne({ Sub_id: profiledata.Sub_id })
            var residentialdata = await residentialmodel.findOne({ Sub_id: profiledata.Sub_id }).select(['-Address_Proof', '-Address'])
            var familydata = await familyinfomodel.findOne({ Sub_id: profiledata.Sub_id })
            res.send({
                profiledata,
                professionaldata,
                residentialdata,
                familydata,
                imgurl: "http://localhost:5000/uploads/",
            })
        }
    }
    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}



exports.senderandreceiverusername = async (req, res) => {
    try {
        let data = {
            SenderUserName: req.body.User_id,
            ReceiverUserName: req.body.ReceiverUserName
        }

        let userdata = await createprofilemodel.find({ Sub_id: data.SenderUserName })
        let receiverdata = await createprofilemodel.find({ UserName: data.ReceiverUserName })

        res.send({
            SenderUserName: userdata[0].UserName,
            SenderFullUserName: userdata[0].Full_Name,
            ReceiverUserName: receiverdata[0].UserName,
            ReceiverFullUserName: receiverdata[0].Full_Name
        })
    }

    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}






exports.sendintrestcontroller = async (req, res) => {
    try {
        let viewdata = await intrestmodel.find({ SenderUserName: req.body.SenderUserName, ReceiverUserName: req.body.ReceiverUserName })
        if (viewdata === null || viewdata.length !== 0) {
            res.send({
                Status: 0,
                Message: "Intrest Already Sended"
            })
        }
        else {
            let data = {
                User_id: req.body.User_id,
                SenderName: req.body.SenderName,
                SenderUserName: req.body.SenderUserName,
                ReceiverName: req.body.ReceiverName,
                ReceiverUserName: req.body.ReceiverUserName,
                Message: req.body.Message,
                Permitted: 'Pending'
            }

            console.log(data)
            let userdata = await intrestmodel(data)
            userdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Intrest Sended Successfully"
                    })
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        res.send({
                            Status: 0,
                            Message: "Data Already Inserted"
                        })
                    }
                    else {
                        res.send({
                            Status: 0,
                            Message: "Data Missing"
                        })
                    }
                })
        }
    }

    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}


exports.viewintrests = async (req, res) => {
    try {
        if (req.body.Permitted === "All") {
            let viewdata = await intrestmodel.find({ ReceiverUserName: req.body.UserName }).select('-User_id').select('-User_id')
            res.send(viewdata)
        }
        else if (req.body.Permitted === "Pending") {
            let viewdata = await intrestmodel.find({ ReceiverUserName: req.body.UserName, Permitted: "Pending" }).select('-User_id')
            res.send(viewdata)
        }

        else if (req.body.Permitted === "Accepted") {
            let viewdata = await intrestmodel.find({ ReceiverUserName: req.body.UserName, Permitted: "Accepted" }).select('-User_id')
            res.send(viewdata)
        }
        else if (req.body.Permitted === "Declined") {
            let viewdata = await intrestmodel.find({ ReceiverUserName: req.body.UserName, Permitted: "Declined" }).select('-User_id')
            res.send(viewdata)
        }

        else if (req.body.Permitted === "AllSended") {
            let viewdata = await intrestmodel.find({ SenderUserName: req.body.UserName }).select('-User_id')
            res.send(viewdata)
        }
        else if (req.body.Permitted === "PendingSended") {
            let viewdata = await intrestmodel.find({ SenderUserName: req.body.UserName, Permitted: "Pending" }).select('-User_id')
            res.send(viewdata)
        }

        else if (req.body.Permitted === "AcceptedSended") {
            let viewdata = await intrestmodel.find({ SenderUserName: req.body.UserName, Permitted: "Accepted" }).select('-User_id')
            res.send(viewdata)
        }
        else {
            let viewdata = await intrestmodel.find({ SenderUserName: req.body.UserName, Permitted: "Declined" }).select('-User_id')
            res.send(viewdata)
        }

    }
    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}


exports.updateinterests = async (req, res) => {
    try {
        let viewdata = await intrestmodel.findOne({ SenderUserName: req.body.SenderUserName, ReceiverUserName: req.body.ReceiverUserName })
        if (viewdata === null || viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            if (req.body.User_id !== viewdata.User_id && req.body.ReceiverUserName === viewdata.ReceiverUserName) {
                let data = {
                    SenderUserName: req.body.SenderUserName,
                    ReceiverUserName: req.body.ReceiverUserName,
                    Permitted: req.body.Permitted
                }
                let updatedata = await intrestmodel.updateOne({ SenderUserName: data.SenderUserName, ReceiverUserName: data.ReceiverUserName }, { Permitted: data.Permitted })
                if (updatedata.modifiedCount === 1) {
                    res.send({
                        Status: 1,
                        Message: "Data Updated Successfully"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data Doesn't Updated"
                    })
                }
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Doesn't Updated"
                })
            }
        }

    }
    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}



exports.deleteintrests = async (req, res) => {
    try {
        let data = {
            SenderUserName: req.body.SenderUserName,
            ReceiverUserName: req.body.ReceiverUserName,
            User_id: req.body.User_id
        }

        let deletedata = await intrestmodel.deleteOne({ SenderUserName: data.SenderUserName, ReceiverUserName: data.ReceiverUserName, User_id: data.User_id })
        if (deletedata.deletedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })

        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn't Deleted"
            })
        }
    }
    catch (error) {
        if (error.CastError) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
}