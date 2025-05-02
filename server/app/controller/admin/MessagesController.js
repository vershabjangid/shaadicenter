const createprofilemodel = require("../../model/web/CreateProfileModel")
const messagesmodel = require("../../model/web/MessagesModel")

exports.sendmessages = async (req, res) => {
    try {
        let viewdata = await createprofilemodel.findOne({ Sub_id: req.body.User_id })
        if (viewdata === null || viewdata === undefined || viewdata.length === 0) {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            let data = {
                User_id: req.body.User_id,
                Sender: viewdata.UserName,
                Receiver: req.body.Receiver,
                Message: req.body.Message,
                Check: "No"
            }
            console.log(data)

            let insertdata = await messagesmodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Sended Successfully"
                    })
                })
                .catch((error) => {
                    res.send({
                        Status: 0,
                        Message: "No User Found"
                    })
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


exports.getusers = async (req, res) => {
    try {
        let viewdata = await createprofilemodel.findOne({ UserName: req.body.UserName }).select(['-_id', '-Sub_id'])
        console.log(viewdata)
        if (viewdata !== null || viewdata !== undefined) {
            res.send({
                Full_Name: viewdata.Full_Name,
                UserName: viewdata.UserName,
                Profile_Picture: viewdata.Profile_Picture,
                imgurl: "http://localhost:5000/uploads/"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "No User Found"
        })
    }
}


exports.viewmessages = async (req, res) => {
    try {
        let viewmessages = await messagesmodel.find({ Sender: req.body.Sender, Receiver: req.body.Receiver })
        let receivemessages = await messagesmodel.find({ Sender: req.body.Receiver, Receiver: req.body.Sender })
        console.log(viewmessages)
        console.log(receivemessages)
        if (viewmessages !== null || viewmessages !== undefined) {
            res.send({
                viewmessages
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
    }
    catch (error) {
        res.send({
            Status: 0,
            Message: "No User Found"
        })
    }
}