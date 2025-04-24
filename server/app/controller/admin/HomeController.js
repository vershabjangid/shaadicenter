const fs = require('fs')
let path = require('path')
const homebannermodel = require('../../model/admin/HomeModel')
const homecountermodel = require('../../model/admin/HomeCounterModel')
const homewhychoosemodel = require('../../model/admin/HomeWhyChooseModel')
const homefeaturedprofilemodel = require('../../model/admin/HomeFeaturedProfileModel')
const homesuccessstoriesmodel = require('../../model/admin/HomeSuccessStoriesmodel')
const finalpath = path.join(__dirname, '../../../uploads')

console.log(finalpath)


exports.addhomebannercontroller = async (req, res) => {
    console.log(req.body)
    let viewdata = await homebannermodel.find()
    if (req.files !== undefined && req.files[0] !== undefined) {
        if (viewdata.length === 0 || viewdata === null) {
            let data = {
                Banner_direction: req.body.Banner_direction == '' ? "right" : req.body.Banner_direction,
                Banner_Image: req.files[0].filename,
                Heading: req.body.Heading == '' ? "Find Your Perfect Match With Confidence" : req.body.Heading,
                Heading_Font_Bold: req.body.Heading_Font_Bold == '' ? "700" : req.body.Heading_Font_Bold,
                Heading_Font_Size: req.body.Heading_Font_Size == '' ? "48" : req.body.Heading_Font_Size,
                Heading_Text_Align: req.body.Heading_Text_Align == '' ? "left" : req.body.Heading_Text_Align,
                Heading_Text_Decoration: req.body.Heading_Text_Decoration == '' ? "None" : req.body.Heading_Text_Decoration,
                Heading_Text_Color: req.body.Heading_Text_Color == '' ? "#000000" : req.body.Heading_Text_Color,
                Heading_Line_Height: req.body.Heading_Line_Height == '' ? "55" : req.body.Heading_Line_Height,
                Sub_Heading: req.body.Sub_Heading == '' ? "Join millions of happy couples who found their soulmate through our trusted platform" : req.body.Sub_Heading,
                Sub_Heading_Font_Bold: req.body.Sub_Heading_Font_Bold == '' ? "300" : req.body.Sub_Heading_Font_Bold,
                Sub_Heading_Font_Size: req.body.Sub_Heading_Font_Size == '' ? "20" : req.body.Sub_Heading_Font_Size,
                Sub_Heading_Text_Align: req.body.Sub_Heading_Text_Align == '' ? "left" : req.body.Sub_Heading_Text_Align,
                Sub_Heading_Text_Decoration: req.body.Sub_Heading_Text_Decoration == '' ? "None" : req.body.Sub_Heading_Text_Decoration,
                Sub_Heading_Text_Color: req.body.Sub_Heading_Text_Color == '' ? "#757575" : req.body.Sub_Heading_Text_Color,
                Sub_Heading_Line_Height: req.body.Sub_Heading_Line_Height == '' ? "24" : req.body.Sub_Heading_Line_Height
            }

            let insertdata = await homebannermodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Data Inserted Successfully"
                    })
                })
                .catch((error) => {
                    if (error.code == 11000) {
                        res.send({
                            Status: 0,
                            Message: "Data Already Exists"
                        })
                    }
                    else {
                        res.send({
                            Status: 0,
                            Message: "Data Missing"
                        })
                    }
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Already Exists"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })

    }
}



exports.viewhomebanner = async (req, res) => {
    let viewdata = await homebannermodel.find()
    let url = "http://api.shaadicenter.org/uploads/"
    res.send({ viewdata, url })
}




exports.updatehomebanner = async (req, res) => {
    let viewdata = await homebannermodel.find();
    if (req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }

        let updatedata = await homebannermodel.updateOne({ _id: data._id }, {
            Banner_direction: req.body.Banner_direction == '' ? viewdata[0].Banner_direction : req.body.Banner_direction,
            Heading: req.body.Heading == '' ? viewdata[0] : req.body.Heading,
            Heading_Font_Bold: req.body.Heading_Font_Bold == '' ? viewdata[0].Heading_Font_Bold : req.body.Heading_Font_Bold,
            Heading_Font_Size: req.body.Heading_Font_Size == '' ? viewdata[0].Heading_Font_Size : req.body.Heading_Font_Size,
            Heading_Text_Align: req.body.Heading_Text_Align == '' ? viewdata[0].Heading_Text_Align : req.body.Heading_Text_Align,
            Heading_Text_Decoration: req.body.Heading_Text_Decoration == '' ? viewdata[0].Heading_Text_Decoration : req.body.Heading_Text_Decoration,
            Heading_Text_Color: req.body.Heading_Text_Color == '' ? viewdata[0].Heading_Text_Color : req.body.Heading_Text_Color,
            Heading_Line_Height: req.body.Heading_Line_Height == '' ? viewdata[0].Heading_Line_Height : req.body.Heading_Line_Height,
            Sub_Heading: req.body.Sub_Heading == '' ? viewdata[0].Sub_Heading : req.body.Sub_Heading,
            Sub_Heading_Font_Bold: req.body.Sub_Heading_Font_Bold == '' ? viewdata[0].Sub_Heading_Font_Bold : req.body.Sub_Heading_Font_Bold,
            Sub_Heading_Font_Size: req.body.Sub_Heading_Font_Size == '' ? viewdata[0].Sub_Heading_Font_Size : req.body.Sub_Heading_Font_Size,
            Sub_Heading_Text_Align: req.body.Sub_Heading_Text_Align == '' ? viewdata[0].Sub_Heading_Text_Align : req.body.Sub_Heading_Text_Align,
            Sub_Heading_Text_Decoration: req.body.Sub_Heading_Text_Decoration == '' ? viewdata[0].Sub_Heading_Text_Decoration : req.body.Sub_Heading_Text_Decoration,
            Sub_Heading_Text_Color: req.body.Sub_Heading_Text_Color == '' ? viewdata[0].Sub_Heading_Text_Color : req.body.Sub_Heading_Text_Color,
            Sub_Heading_Line_Height: req.body.Sub_Heading_Line_Height == '' ? viewdata[0].Sub_Heading_Line_Height : req.body.Sub_Heading_Line_Height
        })
        if (updatedata.modifiedCount > 0) {
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
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            let data = {
                _id: req.body._id
            }

            let updatedata = await homebannermodel.updateOne({ _id: data._id }, {
                Banner_direction: req.body.Banner_direction == '' ? viewdata[0].Banner_direction : req.body.Banner_direction,
                Banner_Image: req.files[0].filename,
                Heading: req.body.Heading == '' ? viewdata[0] : req.body.Heading,
                Heading_Font_Bold: req.body.Heading_Font_Bold == '' ? viewdata[0].Heading_Font_Bold : req.body.Heading_Font_Bold,
                Heading_Font_Size: req.body.Heading_Font_Size == '' ? viewdata[0].Heading_Font_Size : req.body.Heading_Font_Size,
                Heading_Text_Align: req.body.Heading_Text_Align == '' ? viewdata[0].Heading_Text_Align : req.body.Heading_Text_Align,
                Heading_Text_Decoration: req.body.Heading_Text_Decoration == '' ? viewdata[0].Heading_Text_Decoration : req.body.Heading_Text_Decoration,
                Heading_Text_Color: req.body.Heading_Text_Color == '' ? viewdata[0].Heading_Text_Color : req.body.Heading_Text_Color,
                Heading_Line_Height: req.body.Heading_Line_Height == '' ? viewdata[0].Heading_Line_Height : req.body.Heading_Line_Height,
                Sub_Heading: req.body.Sub_Heading == '' ? viewdata[0].Sub_Heading : req.body.Sub_Heading,
                Sub_Heading_Font_Bold: req.body.Sub_Heading_Font_Bold == '' ? viewdata[0].Sub_Heading_Font_Bold : req.body.Sub_Heading_Font_Bold,
                Sub_Heading_Font_Size: req.body.Sub_Heading_Font_Size == '' ? viewdata[0].Sub_Heading_Font_Size : req.body.Sub_Heading_Font_Size,
                Sub_Heading_Text_Align: req.body.Sub_Heading_Text_Align == '' ? viewdata[0].Sub_Heading_Text_Align : req.body.Sub_Heading_Text_Align,
                Sub_Heading_Text_Decoration: req.body.Sub_Heading_Text_Decoration == '' ? viewdata[0].Sub_Heading_Text_Decoration : req.body.Sub_Heading_Text_Decoration,
                Sub_Heading_Text_Color: req.body.Sub_Heading_Text_Color == '' ? viewdata[0].Sub_Heading_Text_Color : req.body.Sub_Heading_Text_Color,
                Sub_Heading_Line_Height: req.body.Sub_Heading_Line_Height == '' ? viewdata[0].Sub_Heading_Line_Height : req.body.Sub_Heading_Line_Height
            })
            if (updatedata.modifiedCount > 0) {
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                fs.unlinkSync(`${finalpath}/${viewdata[0].Banner_Image}`)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Doesn't Updated"
                })
            }
        }
    }
}






// exports.deletehomebanner = async (req, res) => {
//     let data = {
//         _id: req.body._id
//     }

//     let deletedata = await homebannermodel.deleteOne({ _id: data._id })
//     if (deletedata.deletedCount === 1) {
//         res.send({
//             Status: 1,
//             Message: "Data Deleted Successfully"
//         })
//         fs.unlinkSync(`${finalpath}/${req.body.Banner_Image}`)
//     }
//     else {
//         res.send({
//             Status: 0,
//             Message: "Data Doesn't Deleted"
//         })
//     }
// }





exports.addhomecounter = async (req, res) => {
    let data = {
        Counter_Value: req.body.Counter_Value,
        Counter_Title: req.body.Counter_Title
    }

    let insertdata = await homecountermodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Data Added Successfully"
            })
        })
        .catch((error) => {
            if (error.code == 11000) {
                res.send({
                    Status: 0,
                    Message: "Data Already Exists"
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

exports.viewhomecounters = async (req, res) => {
    let viewdata = await homecountermodel.find()
    res.send(viewdata)
}


exports.deletecounters = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await homecountermodel.deleteOne({ _id: data._id })
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






exports.Homewhychoosecontroller = async (req, res) => {
    console.log(req.body)
    let viewdata = await homewhychoosemodel.find()
    if (req.files === undefined || req.files[0] === undefined) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            if (viewdata.length === 0) {
                let data = {
                    Sub_id: "1",
                    Why_Choose_Card_Icon: req.files[0].filename,
                    Why_Choose_Card_Section_Head_Text_Bold: req.body.Why_Choose_Card_Section_Head_Text_Bold,
                    Why_Choose_Card_Section_Head_Font_Size: req.body.Why_Choose_Card_Section_Head_Font_Size,
                    Why_Choose_Card_Section_Head_Text_Align: req.body.Why_Choose_Card_Section_Head_Text_Align,
                    Why_Choose_Card_Section_Head_Text_Decoration: req.body.Why_Choose_Card_Section_Head_Text_Decoration,
                    Why_Choose_Card_Section_Home_Heading_Color: req.body.Why_Choose_Card_Section_Home_Heading_Color,
                    Why_Choose_Card_Section_Head_Text_Line: req.body.Why_Choose_Card_Section_Head_Text_Line,
                    Why_Choose_Card_Section_Home_Heading: req.body.Why_Choose_Card_Section_Home_Heading,

                    Why_Choose_Sub_Head_Text_Bold: req.body.Why_Choose_Sub_Head_Text_Bold,
                    Why_Choose_Sub_Head_Font_Size: req.body.Why_Choose_Sub_Head_Font_Size,
                    Why_Choose_Sub_Head_Text_Align: req.body.Why_Choose_Sub_Head_Text_Align,
                    Why_Choose_Sub_Head_Text_Decoration: req.body.Why_Choose_Sub_Head_Text_Decoration,
                    Why_Choose_Sub_Home_Heading_Color: req.body.Why_Choose_Sub_Home_Heading_Color,
                    Why_Choose_Sub_Head_Text_Line: req.body.Why_Choose_Sub_Head_Text_Line,
                    Why_Choose_Card_Section_Sub_Home_Heading: req.body.Why_Choose_Card_Section_Sub_Home_Heading,
                }
                let insertdata = await homewhychoosemodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })
            }
            else {
                let data = {
                    Sub_id: "1",
                    Why_Choose_Card_Icon: req.files[0].filename,
                    Why_Choose_Card_Section_Head_Text_Bold: viewdata[0].Why_Choose_Card_Section_Head_Text_Bold,
                    Why_Choose_Card_Section_Head_Font_Size: viewdata[0].Why_Choose_Card_Section_Head_Font_Size,
                    Why_Choose_Card_Section_Head_Text_Align: viewdata[0].Why_Choose_Card_Section_Head_Text_Align,
                    Why_Choose_Card_Section_Head_Text_Decoration: viewdata[0].Why_Choose_Card_Section_Head_Text_Decoration,
                    Why_Choose_Card_Section_Home_Heading_Color: viewdata[0].Why_Choose_Card_Section_Home_Heading_Color,
                    Why_Choose_Card_Section_Head_Text_Line: viewdata[0].Why_Choose_Card_Section_Head_Text_Line,
                    Why_Choose_Card_Section_Home_Heading: req.body.Why_Choose_Card_Section_Home_Heading,
                    Why_Choose_Sub_Head_Text_Bold: viewdata[0].Why_Choose_Sub_Head_Text_Bold,
                    Why_Choose_Sub_Head_Font_Size: viewdata[0].Why_Choose_Sub_Head_Font_Size,
                    Why_Choose_Sub_Head_Text_Align: viewdata[0].Why_Choose_Sub_Head_Text_Align,
                    Why_Choose_Sub_Head_Text_Decoration: viewdata[0].Why_Choose_Sub_Head_Text_Decoration,
                    Why_Choose_Sub_Home_Heading_Color: viewdata[0].Why_Choose_Sub_Home_Heading_Color,
                    Why_Choose_Sub_Head_Text_Line: viewdata[0].Why_Choose_Sub_Head_Text_Line,
                    Why_Choose_Card_Section_Sub_Home_Heading: req.body.Why_Choose_Card_Section_Sub_Home_Heading,
                }

                let insertdata = await homewhychoosemodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })
            }
        }
    }
}



exports.viewhomewhychoose = async (req, res) => {
    let viewdata = await homewhychoosemodel.find()
    if (viewdata.length != 0) {
        res.send(viewdata)
    }
    else {
        res.send(null)
    }
}


exports.deletehomewhychoose = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await homewhychoosemodel.deleteOne({ _id: data._id })
    if (deletedata.deletedCount === 1) {
        res.send({
            Status: 1,
            Message: "Data Deleted Successfully"
        })
        fs.unlinkSync(`${finalpath}/${req.body.Why_Choose_Card_Icon}`)
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn't Deleted"
        })
    }
}






exports.updatehomewhychoose = async (req, res) => {
    let viewdata = await homewhychoosemodel.find();
    if (req.files === undefined || req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }

        let updatedata = await homewhychoosemodel.updateOne({ _id: data._id }, {
            Why_Choose_Card_Section_Head_Text_Bold: req.body.Why_Choose_Card_Section_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Bold : req.body.Why_Choose_Card_Section_Head_Text_Bold,
            Why_Choose_Card_Section_Head_Font_Size: req.body.Why_Choose_Card_Section_Head_Font_Size === '' ? viewdata[0].Why_Choose_Card_Section_Head_Font_Size : req.body.Why_Choose_Card_Section_Head_Font_Size,
            Why_Choose_Card_Section_Head_Text_Align: req.body.Why_Choose_Card_Section_Head_Text_Align === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Align : req.body.Why_Choose_Card_Section_Head_Text_Align,
            Why_Choose_Card_Section_Head_Text_Decoration: req.body.Why_Choose_Card_Section_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Decoration : req.body.Why_Choose_Card_Section_Head_Text_Decoration,
            Why_Choose_Card_Section_Home_Heading_Color: req.body.Why_Choose_Card_Section_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Card_Section_Home_Heading_Color : req.body.Why_Choose_Card_Section_Home_Heading_Color,
            Why_Choose_Card_Section_Head_Text_Line: req.body.Why_Choose_Card_Section_Head_Text_Line === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Line : req.body.Why_Choose_Card_Section_Head_Text_Line,
            Why_Choose_Card_Section_Home_Heading: req.body.Why_Choose_Card_Section_Home_Heading === '' ? viewdata[0].Why_Choose_Card_Section_Home_Heading : req.body.Why_Choose_Card_Section_Home_Heading,
            Why_Choose_Sub_Head_Text_Bold: req.body.Why_Choose_Sub_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Bold : req.body.Why_Choose_Sub_Head_Text_Bold,
            Why_Choose_Sub_Head_Font_Size: req.body.Why_Choose_Sub_Head_Font_Size === '' ? viewdata[0].Why_Choose_Sub_Head_Font_Size : req.body.Why_Choose_Sub_Head_Font_Size,
            Why_Choose_Sub_Head_Text_Align: req.body.Why_Choose_Sub_Head_Text_Align === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Align : req.body.Why_Choose_Sub_Head_Text_Align,
            Why_Choose_Sub_Head_Text_Decoration: req.body.Why_Choose_Sub_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Decoration : req.body.Why_Choose_Sub_Head_Text_Decoration,
            Why_Choose_Sub_Home_Heading_Color: req.body.Why_Choose_Sub_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Sub_Home_Heading_Color : req.body.Why_Choose_Sub_Home_Heading_Color,
            Why_Choose_Sub_Head_Text_Line: req.body.Why_Choose_Sub_Head_Text_Line === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Line : req.body.Why_Choose_Sub_Head_Text_Line,
            Why_Choose_Card_Section_Sub_Home_Heading: req.body.Why_Choose_Card_Section_Sub_Home_Heading === '' ? viewdata[0].Why_Choose_Card_Section_Sub_Home_Heading : req.body.Why_Choose_Card_Section_Sub_Home_Heading,
        })
        if (updatedata.modifiedCount > 0) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
            updatehomewhychoosedata(req.body)
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn't Updated"
            })
        }
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            let data = {
                _id: req.body._id
            }
            let viewdata = await homewhychoosemodel.find({ _id: req.body._id });
            fs.unlinkSync(`${finalpath}/${viewdata[0].Why_Choose_Card_Icon}`)
            let updatedata = await homewhychoosemodel.updateOne({ _id: data._id }, {
                Why_Choose_Card_Icon: req.files[0].filename,
                Why_Choose_Card_Section_Head_Text_Bold: req.body.Why_Choose_Card_Section_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Bold : req.body.Why_Choose_Card_Section_Head_Text_Bold,
                Why_Choose_Card_Section_Head_Font_Size: req.body.Why_Choose_Card_Section_Head_Font_Size === '' ? viewdata[0].Why_Choose_Card_Section_Head_Font_Size : req.body.Why_Choose_Card_Section_Head_Font_Size,
                Why_Choose_Card_Section_Head_Text_Align: req.body.Why_Choose_Card_Section_Head_Text_Align === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Align : req.body.Why_Choose_Card_Section_Head_Text_Align,
                Why_Choose_Card_Section_Head_Text_Decoration: req.body.Why_Choose_Card_Section_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Decoration : req.body.Why_Choose_Card_Section_Head_Text_Decoration,
                Why_Choose_Card_Section_Home_Heading_Color: req.body.Why_Choose_Card_Section_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Card_Section_Home_Heading_Color : req.body.Why_Choose_Card_Section_Home_Heading_Color,
                Why_Choose_Card_Section_Head_Text_Line: req.body.Why_Choose_Card_Section_Head_Text_Line === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Line : req.body.Why_Choose_Card_Section_Head_Text_Line,
                Why_Choose_Card_Section_Home_Heading: req.body.Why_Choose_Card_Section_Home_Heading === '' ? viewdata[0].Why_Choose_Card_Section_Home_Heading : req.body.Why_Choose_Card_Section_Home_Heading,
                Why_Choose_Sub_Head_Text_Bold: req.body.Why_Choose_Sub_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Bold : req.body.Why_Choose_Sub_Head_Text_Bold,
                Why_Choose_Sub_Head_Font_Size: req.body.Why_Choose_Sub_Head_Font_Size === '' ? viewdata[0].Why_Choose_Sub_Head_Font_Size : req.body.Why_Choose_Sub_Head_Font_Size,
                Why_Choose_Sub_Head_Text_Align: req.body.Why_Choose_Sub_Head_Text_Align === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Align : req.body.Why_Choose_Sub_Head_Text_Align,
                Why_Choose_Sub_Head_Text_Decoration: req.body.Why_Choose_Sub_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Decoration : req.body.Why_Choose_Sub_Head_Text_Decoration,
                Why_Choose_Sub_Home_Heading_Color: req.body.Why_Choose_Sub_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Sub_Home_Heading_Color : req.body.Why_Choose_Sub_Home_Heading_Color,
                Why_Choose_Sub_Head_Text_Line: req.body.Why_Choose_Sub_Head_Text_Line === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Line : req.body.Why_Choose_Sub_Head_Text_Line,
                Why_Choose_Card_Section_Sub_Home_Heading: req.body.Why_Choose_Card_Section_Sub_Home_Heading === '' ? viewdata[0].Why_Choose_Card_Section_Sub_Home_Heading : req.body.Why_Choose_Card_Section_Sub_Home_Heading,
            })
            if (updatedata.modifiedCount > 0) {
                let viewdata = await homewhychoosemodel.find({ _id: req.body._id });
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                console.log(viewdata[0].Why_Choose_Card_Icon)
                updatehomewhychoosedata(req.body)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Doesn't Updated"
                })
            }
        }
    }
}




let updatehomewhychoosedata = async (req) => {
    let viewdata = await homewhychoosemodel.find();
    console.log(viewdata)
    let updatedata = await homewhychoosemodel.updateMany({ Sub_id: "1" }, {
        Why_Choose_Card_Section_Head_Text_Bold: req.Why_Choose_Card_Section_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Bold : req.Why_Choose_Card_Section_Head_Text_Bold,
        Why_Choose_Card_Section_Head_Font_Size: req.Why_Choose_Card_Section_Head_Font_Size === '' ? viewdata[0].Why_Choose_Card_Section_Head_Font_Size : req.Why_Choose_Card_Section_Head_Font_Size,
        Why_Choose_Card_Section_Head_Text_Align: req.Why_Choose_Card_Section_Head_Text_Align === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Align : req.Why_Choose_Card_Section_Head_Text_Align,
        Why_Choose_Card_Section_Head_Text_Decoration: req.Why_Choose_Card_Section_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Decoration : req.Why_Choose_Card_Section_Head_Text_Decoration,
        Why_Choose_Card_Section_Home_Heading_Color: req.Why_Choose_Card_Section_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Card_Section_Home_Heading_Color : req.Why_Choose_Card_Section_Home_Heading_Color,
        Why_Choose_Card_Section_Head_Text_Line: req.Why_Choose_Card_Section_Head_Text_Line === '' ? viewdata[0].Why_Choose_Card_Section_Head_Text_Line : req.Why_Choose_Card_Section_Head_Text_Line,
        Why_Choose_Sub_Head_Text_Bold: req.Why_Choose_Sub_Head_Text_Bold === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Bold : req.Why_Choose_Sub_Head_Text_Bold,
        Why_Choose_Sub_Head_Font_Size: req.Why_Choose_Sub_Head_Font_Size === '' ? viewdata[0].Why_Choose_Sub_Head_Font_Size : req.Why_Choose_Sub_Head_Font_Size,
        Why_Choose_Sub_Head_Text_Align: req.Why_Choose_Sub_Head_Text_Align === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Align : req.Why_Choose_Sub_Head_Text_Align,
        Why_Choose_Sub_Head_Text_Decoration: req.Why_Choose_Sub_Head_Text_Decoration === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Decoration : req.Why_Choose_Sub_Head_Text_Decoration,
        Why_Choose_Sub_Home_Heading_Color: req.Why_Choose_Sub_Home_Heading_Color === '' ? viewdata[0].Why_Choose_Sub_Home_Heading_Color : req.Why_Choose_Sub_Home_Heading_Color,
        Why_Choose_Sub_Head_Text_Line: req.Why_Choose_Sub_Head_Text_Line === '' ? viewdata[0].Why_Choose_Sub_Head_Text_Line : req.Why_Choose_Sub_Head_Text_Line,
    })

}
















exports.Homefeaturedprofilecontroller = async (req, res) => {
    // console.log(req.body)
    let viewdata = await homefeaturedprofilemodel.find()
    console.log(viewdata)
    if (req.files === undefined || req.files[0] === undefined) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            if (viewdata.length === 0) {
                let data = {
                    Sub_id: "1",
                    Featured_Profile_Card_Image: req.files[0].filename,
                    Featured_Profile_Card_Section_Name_Text_Bold: req.body.Featured_Profile_Card_Section_Name_Text_Bold,
                    Featured_Profile_Card_Section_Name_Font_Size: req.body.Featured_Profile_Card_Section_Name_Font_Size,
                    Featured_Profile_Card_Section_Name_Text_Align: req.body.Featured_Profile_Card_Section_Name_Text_Align,
                    Featured_Profile_Card_Section_Name_Text_Decoration: req.body.Featured_Profile_Card_Section_Name_Text_Decoration,
                    Featured_Profile_Card_Section_Home_Name_Color: req.body.Featured_Profile_Card_Section_Home_Name_Color,
                    Featured_Profile_Card_Section_Name_Text_Line: req.body.Featured_Profile_Card_Section_Name_Text_Line,
                    Featured_Profile_Card_Section_Name_Heading: req.body.Featured_Profile_Card_Section_Name_Heading,

                    Featured_Profile_Age_Text_Bold: req.body.Featured_Profile_Age_Text_Bold,
                    Featured_Profile_Age_Font_Size: req.body.Featured_Profile_Age_Font_Size,
                    Featured_Profile_Age_Text_Align: req.body.Featured_Profile_Age_Text_Align,
                    Featured_Profile_Age_Text_Decoration: req.body.Featured_Profile_Age_Text_Decoration,
                    Featured_Profile_Age_Color: req.body.Featured_Profile_Age_Color,
                    Featured_Profile_Age_Text_Line: req.body.Featured_Profile_Age_Text_Line,
                    Featured_Profile_Card_Section_Age_Heading: req.body.Featured_Profile_Card_Section_Age_Heading,

                    Featured_Profile_Location_Text_Bold: req.body.Featured_Profile_Location_Text_Bold,
                    Featured_Profile_Location_Font_Size: req.body.Featured_Profile_Location_Font_Size,
                    Featured_Profile_Location_Text_Align: req.body.Featured_Profile_Location_Text_Align,
                    Featured_Profile_Location_Text_Decoration: req.body.Featured_Profile_Location_Text_Decoration,
                    Featured_Profile_Location_Color: req.body.Featured_Profile_Location_Color,
                    Featured_Profile_Location_Text_Line: req.body.Featured_Profile_Location_Text_Line,
                    Featured_Profile_Card_Section_Location_Heading: req.body.Featured_Profile_Card_Section_Location_Heading,

                }
                console.log(data)
                let insertdata = await homefeaturedprofilemodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data "
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })

            }
            else {
                let data = {
                    Sub_id: "1",
                    Featured_Profile_Card_Image: req.files[0].filename,
                    Featured_Profile_Card_Section_Name_Text_Bold: viewdata[0].Featured_Profile_Card_Section_Name_Text_Bold,
                    Featured_Profile_Card_Section_Name_Font_Size: viewdata[0].Featured_Profile_Card_Section_Name_Font_Size,
                    Featured_Profile_Card_Section_Name_Text_Align: viewdata[0].Featured_Profile_Card_Section_Name_Text_Align,
                    Featured_Profile_Card_Section_Name_Text_Decoration: viewdata[0].Featured_Profile_Card_Section_Name_Text_Decoration,
                    Featured_Profile_Card_Section_Home_Name_Color: viewdata[0].Featured_Profile_Card_Section_Home_Name_Color,
                    Featured_Profile_Card_Section_Name_Text_Line: viewdata[0].Featured_Profile_Card_Section_Name_Text_Line,
                    Featured_Profile_Card_Section_Name_Heading: req.body.Featured_Profile_Card_Section_Name_Heading,
                    Featured_Profile_Age_Text_Bold: viewdata[0].Featured_Profile_Age_Text_Bold,
                    Featured_Profile_Age_Font_Size: viewdata[0].Featured_Profile_Age_Font_Size,
                    Featured_Profile_Age_Text_Align: viewdata[0].Featured_Profile_Age_Text_Align,
                    Featured_Profile_Age_Text_Decoration: viewdata[0].Featured_Profile_Age_Text_Decoration,
                    Featured_Profile_Age_Color: viewdata[0].Featured_Profile_Age_Color,
                    Featured_Profile_Age_Text_Line: viewdata[0].Featured_Profile_Age_Text_Line,
                    Featured_Profile_Card_Section_Age_Heading: req.body.Featured_Profile_Card_Section_Age_Heading,
                    Featured_Profile_Location_Text_Bold: viewdata[0].Featured_Profile_Location_Text_Bold,
                    Featured_Profile_Location_Font_Size: viewdata[0].Featured_Profile_Location_Font_Size,
                    Featured_Profile_Location_Text_Align: viewdata[0].Featured_Profile_Location_Text_Align,
                    Featured_Profile_Location_Text_Decoration: viewdata[0].Featured_Profile_Location_Text_Decoration,
                    Featured_Profile_Location_Color: viewdata[0].Featured_Profile_Location_Color,
                    Featured_Profile_Location_Text_Line: viewdata[0].Featured_Profile_Location_Text_Line,
                    Featured_Profile_Card_Section_Location_Heading: req.body.Featured_Profile_Card_Section_Location_Heading
                }
                let insertdata = await homefeaturedprofilemodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })
            }
        }
    }
}



exports.viewhomefeaturedprofile = async (req, res) => {
    let viewdata = await homefeaturedprofilemodel.find()
    if (viewdata.length != 0) {
        res.send(viewdata)
    }
    else {
        res.send(null)
    }
}


exports.deletehomefeaturedprofile = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await homefeaturedprofilemodel.deleteOne({ _id: data._id })
    if (deletedata.deletedCount === 1) {
        res.send({
            Status: 1,
            Message: "Data Deleted Successfully"
        })
        fs.unlinkSync(`${finalpath}/${req.body.Featured_Profile_Card_Image}`)
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn't Deleted"
        })
    }
}






exports.updatehomefeaturedprofile = async (req, res) => {
    let viewdata = await homefeaturedprofilemodel.find();
    if (req.files === undefined || req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }

        let updatedata = await homefeaturedprofilemodel.updateOne({ _id: data._id }, {


            Featured_Profile_Card_Section_Name_Text_Bold: req.body.Featured_Profile_Card_Section_Name_Text_Bold === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Bold : req.body.Featured_Profile_Card_Section_Name_Text_Bold,
            Featured_Profile_Card_Section_Name_Font_Size: req.body.Featured_Profile_Card_Section_Name_Font_Size === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Font_Size : req.body.Featured_Profile_Card_Section_Name_Font_Size,
            Featured_Profile_Card_Section_Name_Text_Align: req.body.Featured_Profile_Card_Section_Name_Text_Align === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Align : req.body.Featured_Profile_Card_Section_Name_Text_Align,
            Featured_Profile_Card_Section_Name_Text_Decoration: req.body.Featured_Profile_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Decoration : req.body.Featured_Profile_Card_Section_Name_Text_Decoration,
            Featured_Profile_Card_Section_Home_Name_Color: req.body.Featured_Profile_Card_Section_Home_Name_Color === '' ? viewdata[0].Featured_Profile_Card_Section_Home_Name_Color : req.body.Featured_Profile_Card_Section_Home_Name_Color,
            Featured_Profile_Card_Section_Name_Text_Line: req.body.Featured_Profile_Card_Section_Name_Text_Line === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Line : req.body.Featured_Profile_Card_Section_Name_Text_Line,
            Featured_Profile_Card_Section_Name_Heading: req.body.Featured_Profile_Card_Section_Name_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Heading : req.body.Featured_Profile_Card_Section_Name_Heading,

            Featured_Profile_Age_Text_Bold: req.body.Featured_Profile_Age_Text_Bold === '' ? viewdata[0].Featured_Profile_Age_Text_Bold : req.body.Featured_Profile_Age_Text_Bold,
            Featured_Profile_Age_Font_Size: req.body.Featured_Profile_Age_Font_Size === '' ? viewdata[0].Featured_Profile_Age_Font_Size : req.body.Featured_Profile_Age_Font_Size,
            Featured_Profile_Age_Text_Align: req.body.Featured_Profile_Age_Text_Align === '' ? viewdata[0].Featured_Profile_Age_Text_Align : req.body.Featured_Profile_Age_Text_Align,
            Featured_Profile_Age_Text_Decoration: req.body.Featured_Profile_Age_Text_Decoration === '' ? viewdata[0].Featured_Profile_Age_Text_Decoration : req.body.Featured_Profile_Age_Text_Decoration,
            Featured_Profile_Age_Color: req.body.Featured_Profile_Age_Color === '' ? viewdata[0].Featured_Profile_Age_Color : req.body.Featured_Profile_Age_Color,
            Featured_Profile_Age_Text_Line: req.body.Featured_Profile_Age_Text_Line === '' ? viewdata[0].Featured_Profile_Age_Text_Line : req.body.Featured_Profile_Age_Text_Line,
            Featured_Profile_Card_Section_Age_Heading: req.body.Featured_Profile_Card_Section_Age_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Age_Heading : req.body.Featured_Profile_Card_Section_Age_Heading,


            Featured_Profile_Location_Text_Bold: req.body.Featured_Profile_Location_Text_Bold === '' ? viewdata[0].Featured_Profile_Location_Text_Bold : req.body.Featured_Profile_Location_Text_Bold,
            Featured_Profile_Location_Font_Size: req.body.Featured_Profile_Location_Font_Size === '' ? viewdata[0].Featured_Profile_Location_Font_Size : req.body.Featured_Profile_Location_Font_Size,
            Featured_Profile_Location_Text_Align: req.body.Featured_Profile_Location_Text_Align === '' ? viewdata[0].Featured_Profile_Location_Text_Align : req.body.Featured_Profile_Location_Text_Align,
            Featured_Profile_Location_Text_Decoration: req.body.Featured_Profile_Location_Text_Decoration === '' ? viewdata[0].Featured_Profile_Location_Text_Decoration : req.body.Featured_Profile_Location_Text_Decoration,
            Featured_Profile_Location_Color: req.body.Featured_Profile_Location_Color === '' ? viewdata[0].Featured_Profile_Location_Color : req.body.Featured_Profile_Location_Color,
            Featured_Profile_Location_Text_Line: req.body.Featured_Profile_Location_Text_Line === '' ? viewdata[0].Featured_Profile_Location_Text_Line : req.body.Featured_Profile_Location_Text_Line,
            Featured_Profile_Card_Section_Location_Heading: req.body.Featured_Profile_Card_Section_Location_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Location_Heading : req.body.Featured_Profile_Card_Section_Location_Heading,
        })
        if (updatedata.modifiedCount > 0) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
            updatehomefeaturedprofiledata(req.body)
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn't Updated"
            })
        }
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            let data = {
                _id: req.body._id
            }
            let viewdata = await homefeaturedprofilemodel.find({ _id: req.body._id });
            fs.unlinkSync(`${finalpath}/${viewdata[0].Featured_Profile_Card_Image}`)
            let updatedata = await homefeaturedprofilemodel.updateOne({ _id: data._id }, {
                Featured_Profile_Card_Image: req.files[0].filename,
                Featured_Profile_Card_Section_Name_Text_Bold: req.body.Featured_Profile_Card_Section_Name_Text_Bold === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Bold : req.body.Featured_Profile_Card_Section_Name_Text_Bold,
                Featured_Profile_Card_Section_Name_Font_Size: req.body.Featured_Profile_Card_Section_Name_Font_Size === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Font_Size : req.body.Featured_Profile_Card_Section_Name_Font_Size,
                Featured_Profile_Card_Section_Name_Text_Align: req.body.Featured_Profile_Card_Section_Name_Text_Align === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Align : req.body.Featured_Profile_Card_Section_Name_Text_Align,
                Featured_Profile_Card_Section_Name_Text_Decoration: req.body.Featured_Profile_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Decoration : req.body.Featured_Profile_Card_Section_Name_Text_Decoration,
                Featured_Profile_Card_Section_Home_Name_Color: req.body.Featured_Profile_Card_Section_Home_Name_Color === '' ? viewdata[0].Featured_Profile_Card_Section_Home_Name_Color : req.body.Featured_Profile_Card_Section_Home_Name_Color,
                Featured_Profile_Card_Section_Name_Text_Line: req.body.Featured_Profile_Card_Section_Name_Text_Line === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Line : req.body.Featured_Profile_Card_Section_Name_Text_Line,
                Featured_Profile_Card_Section_Name_Heading: req.body.Featured_Profile_Card_Section_Name_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Heading : req.body.Featured_Profile_Card_Section_Name_Heading,

                Featured_Profile_Age_Text_Bold: req.body.Featured_Profile_Age_Text_Bold === '' ? viewdata[0].Featured_Profile_Age_Text_Bold : req.body.Featured_Profile_Age_Text_Bold,
                Featured_Profile_Age_Font_Size: req.body.Featured_Profile_Age_Font_Size === '' ? viewdata[0].Featured_Profile_Age_Font_Size : req.body.Featured_Profile_Age_Font_Size,
                Featured_Profile_Age_Text_Align: req.body.Featured_Profile_Age_Text_Align === '' ? viewdata[0].Featured_Profile_Age_Text_Align : req.body.Featured_Profile_Age_Text_Align,
                Featured_Profile_Age_Text_Decoration: req.body.Featured_Profile_Age_Text_Decoration === '' ? viewdata[0].Featured_Profile_Age_Text_Decoration : req.body.Featured_Profile_Age_Text_Decoration,
                Featured_Profile_Age_Color: req.body.Featured_Profile_Age_Color === '' ? viewdata[0].Featured_Profile_Age_Color : req.body.Featured_Profile_Age_Color,
                Featured_Profile_Age_Text_Line: req.body.Featured_Profile_Age_Text_Line === '' ? viewdata[0].Featured_Profile_Age_Text_Line : req.body.Featured_Profile_Age_Text_Line,
                Featured_Profile_Card_Section_Age_Heading: req.body.Featured_Profile_Card_Section_Age_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Age_Heading : req.body.Featured_Profile_Card_Section_Age_Heading,


                Featured_Profile_Location_Text_Bold: req.body.Featured_Profile_Location_Text_Bold === '' ? viewdata[0].Featured_Profile_Location_Text_Bold : req.body.Featured_Profile_Location_Text_Bold,
                Featured_Profile_Location_Font_Size: req.body.Featured_Profile_Location_Font_Size === '' ? viewdata[0].Featured_Profile_Location_Font_Size : req.body.Featured_Profile_Location_Font_Size,
                Featured_Profile_Location_Text_Align: req.body.Featured_Profile_Location_Text_Align === '' ? viewdata[0].Featured_Profile_Location_Text_Align : req.body.Featured_Profile_Location_Text_Align,
                Featured_Profile_Location_Text_Decoration: req.body.Featured_Profile_Location_Text_Decoration === '' ? viewdata[0].Featured_Profile_Location_Text_Decoration : req.body.Featured_Profile_Location_Text_Decoration,
                Featured_Profile_Location_Color: req.body.Featured_Profile_Location_Color === '' ? viewdata[0].Featured_Profile_Location_Color : req.body.Featured_Profile_Location_Color,
                Featured_Profile_Location_Text_Line: req.body.Featured_Profile_Location_Text_Line === '' ? viewdata[0].Featured_Profile_Location_Text_Line : req.body.Featured_Profile_Location_Text_Line,
                Featured_Profile_Card_Section_Location_Heading: req.body.Featured_Profile_Card_Section_Location_Heading === '' ? viewdata[0].Featured_Profile_Card_Section_Location_Heading : req.body.Featured_Profile_Card_Section_Location_Heading,
            })
            if (updatedata.modifiedCount > 0) {
                let viewdata = await homefeaturedprofilemodel.find({ _id: req.body._id });
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                console.log(viewdata[0].Featured_Profile_Card_Image)
                updatehomefeaturedprofiledata(req.body)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Doesn't Updated"
                })
            }
        }
    }
}




let updatehomefeaturedprofiledata = async (req) => {
    let viewdata = await homefeaturedprofilemodel.find();
    let updatedata = await homefeaturedprofilemodel.updateMany({ Sub_id: "1" }, {
        Featured_Profile_Card_Section_Name_Text_Bold: req.Featured_Profile_Card_Section_Name_Text_Bold === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Bold : req.Featured_Profile_Card_Section_Name_Text_Bold,
        Featured_Profile_Card_Section_Name_Font_Size: req.Featured_Profile_Card_Section_Name_Font_Size === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Font_Size : req.Featured_Profile_Card_Section_Name_Font_Size,
        Featured_Profile_Card_Section_Name_Text_Align: req.Featured_Profile_Card_Section_Name_Text_Align === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Align : req.Featured_Profile_Card_Section_Name_Text_Align,
        Featured_Profile_Card_Section_Name_Text_Decoration: req.Featured_Profile_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Decoration : req.Featured_Profile_Card_Section_Name_Text_Decoration,
        Featured_Profile_Card_Section_Home_Name_Color: req.Featured_Profile_Card_Section_Home_Name_Color === '' ? viewdata[0].Featured_Profile_Card_Section_Home_Name_Color : req.Featured_Profile_Card_Section_Home_Name_Color,
        Featured_Profile_Card_Section_Name_Text_Line: req.Featured_Profile_Card_Section_Name_Text_Line === '' ? viewdata[0].Featured_Profile_Card_Section_Name_Text_Line : req.Featured_Profile_Card_Section_Name_Text_Line,

        Featured_Profile_Age_Text_Bold: req.Featured_Profile_Age_Text_Bold === '' ? viewdata[0].Featured_Profile_Age_Text_Bold : req.Featured_Profile_Age_Text_Bold,
        Featured_Profile_Age_Font_Size: req.Featured_Profile_Age_Font_Size === '' ? viewdata[0].Featured_Profile_Age_Font_Size : req.Featured_Profile_Age_Font_Size,
        Featured_Profile_Age_Text_Align: req.Featured_Profile_Age_Text_Align === '' ? viewdata[0].Featured_Profile_Age_Text_Align : req.Featured_Profile_Age_Text_Align,
        Featured_Profile_Age_Text_Decoration: req.Featured_Profile_Age_Text_Decoration === '' ? viewdata[0].Featured_Profile_Age_Text_Decoration : req.Featured_Profile_Age_Text_Decoration,
        Featured_Profile_Age_Color: req.Featured_Profile_Age_Color === '' ? viewdata[0].Featured_Profile_Age_Color : req.Featured_Profile_Age_Color,
        Featured_Profile_Age_Text_Line: req.Featured_Profile_Age_Text_Line === '' ? viewdata[0].Featured_Profile_Age_Text_Line : req.Featured_Profile_Age_Text_Line,


        Featured_Profile_Location_Text_Bold: req.Featured_Profile_Location_Text_Bold === '' ? viewdata[0].Featured_Profile_Location_Text_Bold : req.Featured_Profile_Location_Text_Bold,
        Featured_Profile_Location_Font_Size: req.Featured_Profile_Location_Font_Size === '' ? viewdata[0].Featured_Profile_Location_Font_Size : req.Featured_Profile_Location_Font_Size,
        Featured_Profile_Location_Text_Align: req.Featured_Profile_Location_Text_Align === '' ? viewdata[0].Featured_Profile_Location_Text_Align : req.Featured_Profile_Location_Text_Align,
        Featured_Profile_Location_Text_Decoration: req.Featured_Profile_Location_Text_Decoration === '' ? viewdata[0].Featured_Profile_Location_Text_Decoration : req.Featured_Profile_Location_Text_Decoration,
        Featured_Profile_Location_Color: req.Featured_Profile_Location_Color === '' ? viewdata[0].Featured_Profile_Location_Color : req.Featured_Profile_Location_Color,
        Featured_Profile_Location_Text_Line: req.Featured_Profile_Location_Text_Line === '' ? viewdata[0].Featured_Profile_Location_Text_Line : req.Featured_Profile_Location_Text_Line,
    })
}









exports.Homesuccessstoriescontroller = async (req, res) => {
    console.log(req.files)
    let viewdata = await homesuccessstoriesmodel.find()
    if (req.files === undefined || req.files[0] === undefined) {
        res.send({
            Status: 0,
            Message: "Data Missing 414"
        })
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            if (viewdata.length === 0) {
                let data = {
                    Sub_id: "1",
                    Success_Stories_Card_Image: req.files[0].filename,
                    Success_Stories_Card_Section_Name_Text_Bold: req.body.Success_Stories_Card_Section_Name_Text_Bold,
                    Success_Stories_Card_Section_Name_Font_Size: req.body.Success_Stories_Card_Section_Name_Font_Size,
                    Success_Stories_Card_Section_Name_Text_Align: req.body.Success_Stories_Card_Section_Name_Text_Align,
                    Success_Stories_Card_Section_Name_Text_Decoration: req.body.Success_Stories_Card_Section_Name_Text_Decoration,
                    Success_Stories_Card_Section_Home_Name_Color: req.body.Success_Stories_Card_Section_Home_Name_Color,
                    Success_Stories_Card_Section_Name_Text_Line: req.body.Success_Stories_Card_Section_Name_Text_Line,
                    Success_Stories_Card_Section_Name_Heading: req.body.Success_Stories_Card_Section_Name_Heading,

                    Success_Stories_Marriage_Date_Text_Bold: req.body.Success_Stories_Marriage_Date_Text_Bold,
                    Success_Stories_Marriage_Date_Font_Size: req.body.Success_Stories_Marriage_Date_Font_Size,
                    Success_Stories_Marriage_Date_Text_Align: req.body.Success_Stories_Marriage_Date_Text_Align,
                    Success_Stories_Marriage_Date_Text_Decoration: req.body.Success_Stories_Marriage_Date_Text_Decoration,
                    Success_Stories_Marriage_Date_Color: req.body.Success_Stories_Marriage_Date_Color,
                    Success_Stories_Marriage_Date_Text_Line: req.body.Success_Stories_Marriage_Date_Text_Line,
                    Success_Stories_Card_Section_Marriage_Date_Heading: req.body.Success_Stories_Card_Section_Marriage_Date_Heading,

                    Success_Stories_Description_Text_Bold: req.body.Success_Stories_Description_Text_Bold,
                    Success_Stories_Description_Font_Size: req.body.Success_Stories_Description_Font_Size,
                    Success_Stories_Description_Text_Align: req.body.Success_Stories_Description_Text_Align,
                    Success_Stories_Description_Text_Decoration: req.body.Success_Stories_Description_Text_Decoration,
                    Success_Stories_Description_Color: req.body.Success_Stories_Description_Color,
                    Success_Stories_Description_Text_Line: req.body.Success_Stories_Description_Text_Line,
                    Success_Stories_Card_Section_Description_Heading: req.body.Success_Stories_Card_Section_Description_Heading,

                }
                console.log(data)
                let insertdata = await homesuccessstoriesmodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })

            }
            else {
                let data = {
                    Sub_id: "1",
                    Success_Stories_Card_Image: req.files[0].filename,
                    Success_Stories_Card_Section_Name_Text_Bold: viewdata[0].Success_Stories_Card_Section_Name_Text_Bold || 400,
                    Success_Stories_Card_Section_Name_Font_Size: viewdata[0].Success_Stories_Card_Section_Name_Font_Size || 25,
                    Success_Stories_Card_Section_Name_Text_Align: viewdata[0].Success_Stories_Card_Section_Name_Text_Align || 'left',
                    Success_Stories_Card_Section_Name_Text_Decoration: viewdata[0].Success_Stories_Card_Section_Name_Text_Decoration || 'none',
                    Success_Stories_Card_Section_Home_Name_Color: viewdata[0].Success_Stories_Card_Section_Home_Name_Color || "red",
                    Success_Stories_Card_Section_Name_Text_Line: viewdata[0].Success_Stories_Card_Section_Name_Text_Line || 25,
                    Success_Stories_Card_Section_Name_Heading: req.body.Success_Stories_Card_Section_Name_Heading,

                    Success_Stories_Marriage_Date_Text_Bold: viewdata[0].Success_Stories_Marriage_Date_Text_Bold || 300,
                    Success_Stories_Marriage_Date_Font_Size: viewdata[0].Success_Stories_Marriage_Date_Font_Size || 20,
                    Success_Stories_Marriage_Date_Text_Align: viewdata[0].Success_Stories_Marriage_Date_Text_Align || 'left',
                    Success_Stories_Marriage_Date_Text_Decoration: viewdata[0].Success_Stories_Marriage_Date_Text_Decoration || 'none',
                    Success_Stories_Marriage_Date_Color: viewdata[0].Success_Stories_Marriage_Date_Color || 'black',
                    Success_Stories_Marriage_Date_Text_Line: viewdata[0].Success_Stories_Marriage_Date_Text_Line || 25,
                    Success_Stories_Card_Section_Marriage_Date_Heading: req.body.Success_Stories_Card_Section_Marriage_Date_Heading,

                    Success_Stories_Description_Text_Bold: viewdata[0].Success_Stories_Description_Text_Bold || 300,
                    Success_Stories_Description_Font_Size: viewdata[0].Success_Stories_Description_Font_Size || 20,
                    Success_Stories_Description_Text_Align: viewdata[0].Success_Stories_Description_Text_Align || 'left',
                    Success_Stories_Description_Text_Decoration: viewdata[0].Success_Stories_Description_Text_Decoration || 'none',
                    Success_Stories_Description_Color: viewdata[0].Success_Stories_Description_Color || "black",
                    Success_Stories_Description_Text_Line: viewdata[0].Success_Stories_Description_Text_Line || 25,
                    Success_Stories_Card_Section_Description_Heading: req.body.Success_Stories_Card_Section_Description_Heading
                }
                console.log(data)
                let insertdata = await homesuccessstoriesmodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Data Added Successfully"
                        })
                    })
                    .catch((error) => {
                        if (error.code == 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Exists"
                            })
                        }
                        else {
                            res.send({
                                Status: 0,
                                Message: "Data Missing"
                            })
                        }

                        fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                    })
            }
        }
    }
}


exports.viewhomesuccessstories = async (req, res) => {
    let viewdata = await homesuccessstoriesmodel.find()
    if (viewdata.length != 0) {
        res.send(viewdata)
    }
    else {
        res.send(null)
    }
}


exports.deletehomesuccessstories = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await homesuccessstoriesmodel.deleteOne({ _id: data._id })
    if (deletedata.deletedCount === 1) {
        res.send({
            Status: 1,
            Message: "Data Deleted Successfully"
        })
        fs.unlinkSync(`${finalpath}/${req.body.Success_Stories_Card_Image}`)
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn't Deleted"
        })
    }
}





exports.updatesuccessstories = async (req, res) => {
    let viewdata = await homesuccessstoriesmodel.find();
    if (req.files === undefined || req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }

        let updatedata = await homesuccessstoriesmodel.updateOne({ _id: data._id }, {
            Success_Stories_Card_Section_Name_Text_Bold: req.body.Success_Stories_Card_Section_Name_Text_Bold === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Bold : req.body.Success_Stories_Card_Section_Name_Text_Bold,
            Success_Stories_Card_Section_Name_Font_Size: req.body.Success_Stories_Card_Section_Name_Font_Size === '' ? viewdata[0].Success_Stories_Card_Section_Name_Font_Size : req.body.Success_Stories_Card_Section_Name_Font_Size,
            Success_Stories_Card_Section_Name_Text_Align: req.body.Success_Stories_Card_Section_Name_Text_Align === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Align : req.body.Success_Stories_Card_Section_Name_Text_Align,
            Success_Stories_Card_Section_Name_Text_Decoration: req.body.Success_Stories_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Decoration : req.body.Success_Stories_Card_Section_Name_Text_Decoration,
            Success_Stories_Card_Section_Home_Name_Color: req.body.Success_Stories_Card_Section_Home_Name_Color === '' ? viewdata[0].Success_Stories_Card_Section_Home_Name_Color : req.body.Success_Stories_Card_Section_Home_Name_Color,
            Success_Stories_Card_Section_Name_Text_Line: req.body.Success_Stories_Card_Section_Name_Text_Line === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Line : req.body.Success_Stories_Card_Section_Name_Text_Line,
            Success_Stories_Card_Section_Name_Heading: req.body.Success_Stories_Card_Section_Name_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Name_Heading : req.body.Success_Stories_Card_Section_Name_Heading,
            Success_Stories_Marriage_Date_Text_Bold: req.body.Success_Stories_Marriage_Date_Text_Bold === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Bold : req.body.Success_Stories_Marriage_Date_Text_Bold,
            Success_Stories_Marriage_Date_Font_Size: req.body.Success_Stories_Marriage_Date_Font_Size === '' ? viewdata[0].Success_Stories_Marriage_Date_Font_Size : req.body.Success_Stories_Marriage_Date_Font_Size,
            Success_Stories_Marriage_Date_Text_Align: req.body.Success_Stories_Marriage_Date_Text_Align === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Align : req.body.Success_Stories_Marriage_Date_Text_Align,
            Success_Stories_Marriage_Date_Text_Decoration: req.body.Success_Stories_Marriage_Date_Text_Decoration === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Decoration : req.body.Success_Stories_Marriage_Date_Text_Decoration,
            Success_Stories_Marriage_Date_Color: req.body.Success_Stories_Marriage_Date_Color === '' ? viewdata[0].Success_Stories_Marriage_Date_Color : req.body.Success_Stories_Marriage_Date_Color,
            Success_Stories_Marriage_Date_Text_Line: req.body.Success_Stories_Marriage_Date_Text_Line === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Line : req.body.Success_Stories_Marriage_Date_Text_Line,
            Success_Stories_Card_Section_Marriage_Date_Heading: req.body.Success_Stories_Card_Section_Marriage_Date_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Marriage_Date_Heading : req.body.Success_Stories_Card_Section_Marriage_Date_Heading,
            Success_Stories_Description_Text_Bold: req.body.Success_Stories_Description_Text_Bold === '' ? viewdata[0].Success_Stories_Description_Text_Bold : req.body.Success_Stories_Description_Text_Bold,
            Success_Stories_Description_Font_Size: req.body.Success_Stories_Description_Font_Size === '' ? viewdata[0].Success_Stories_Description_Font_Size : req.body.Success_Stories_Description_Font_Size,
            Success_Stories_Description_Text_Align: req.body.Success_Stories_Description_Text_Align === '' ? viewdata[0].Success_Stories_Description_Text_Align : req.body.Success_Stories_Description_Text_Align,
            Success_Stories_Description_Text_Decoration: req.body.Success_Stories_Description_Text_Decoration === '' ? viewdata[0].Success_Stories_Description_Text_Decoration : req.body.Success_Stories_Description_Text_Decoration,
            Success_Stories_Description_Color: req.body.Success_Stories_Description_Color === '' ? viewdata[0].Success_Stories_Description_Color : req.body.Success_Stories_Description_Color,
            Success_Stories_Description_Text_Line: req.body.Success_Stories_Description_Text_Line === '' ? viewdata[0].Success_Stories_Description_Text_Line : req.body.Success_Stories_Description_Text_Line,
            Success_Stories_Card_Section_Description_Heading: req.body.Success_Stories_Card_Section_Description_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Description_Heading : req.body.Success_Stories_Card_Section_Description_Heading,
        })
        if (updatedata.modifiedCount > 0) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
            updatesuccessstoriesdata(req.body)
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn't Updated"
            })
        }
    }
    else {
        if (req.files[0].filename.includes(".fake")) {
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
            res.send({
                Status: 0,
                Message: "Unsupported File Format"
            })
        }
        else {
            let data = {
                _id: req.body._id
            }
            let viewdata = await homesuccessstoriesmodel.find({ _id: req.body._id });
            fs.unlinkSync(`${finalpath}/${viewdata[0].Success_Stories_Card_Image}`)
            let updatedata = await homesuccessstoriesmodel.updateOne({ _id: data._id }, {

                Success_Stories_Card_Image: req.files[0].filename,
                Success_Stories_Card_Section_Name_Text_Bold: req.body.Success_Stories_Card_Section_Name_Text_Bold === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Bold : req.body.Success_Stories_Card_Section_Name_Text_Bold,
                Success_Stories_Card_Section_Name_Font_Size: req.body.Success_Stories_Card_Section_Name_Font_Size === '' ? viewdata[0].Success_Stories_Card_Section_Name_Font_Size : req.body.Success_Stories_Card_Section_Name_Font_Size,
                Success_Stories_Card_Section_Name_Text_Align: req.body.Success_Stories_Card_Section_Name_Text_Align === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Align : req.body.Success_Stories_Card_Section_Name_Text_Align,
                Success_Stories_Card_Section_Name_Text_Decoration: req.body.Success_Stories_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Decoration : req.body.Success_Stories_Card_Section_Name_Text_Decoration,
                Success_Stories_Card_Section_Home_Name_Color: req.body.Success_Stories_Card_Section_Home_Name_Color === '' ? viewdata[0].Success_Stories_Card_Section_Home_Name_Color : req.body.Success_Stories_Card_Section_Home_Name_Color,
                Success_Stories_Card_Section_Name_Text_Line: req.body.Success_Stories_Card_Section_Name_Text_Line === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Line : req.body.Success_Stories_Card_Section_Name_Text_Line,
                Success_Stories_Card_Section_Name_Heading: req.body.Success_Stories_Card_Section_Name_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Name_Heading : req.body.Success_Stories_Card_Section_Name_Heading,
                Success_Stories_Marriage_Date_Text_Bold: req.body.Success_Stories_Marriage_Date_Text_Bold === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Bold : req.body.Success_Stories_Marriage_Date_Text_Bold,
                Success_Stories_Marriage_Date_Font_Size: req.body.Success_Stories_Marriage_Date_Font_Size === '' ? viewdata[0].Success_Stories_Marriage_Date_Font_Size : req.body.Success_Stories_Marriage_Date_Font_Size,
                Success_Stories_Marriage_Date_Text_Align: req.body.Success_Stories_Marriage_Date_Text_Align === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Align : req.body.Success_Stories_Marriage_Date_Text_Align,
                Success_Stories_Marriage_Date_Text_Decoration: req.body.Success_Stories_Marriage_Date_Text_Decoration === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Decoration : req.body.Success_Stories_Marriage_Date_Text_Decoration,
                Success_Stories_Marriage_Date_Color: req.body.Success_Stories_Marriage_Date_Color === '' ? viewdata[0].Success_Stories_Marriage_Date_Color : req.body.Success_Stories_Marriage_Date_Color,
                Success_Stories_Marriage_Date_Text_Line: req.body.Success_Stories_Marriage_Date_Text_Line === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Line : req.body.Success_Stories_Marriage_Date_Text_Line,
                Success_Stories_Card_Section_Marriage_Date_Heading: req.body.Success_Stories_Card_Section_Marriage_Date_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Marriage_Date_Heading : req.body.Success_Stories_Card_Section_Marriage_Date_Heading,
                Success_Stories_Description_Text_Bold: req.body.Success_Stories_Description_Text_Bold === '' ? viewdata[0].Success_Stories_Description_Text_Bold : req.body.Success_Stories_Description_Text_Bold,
                Success_Stories_Description_Font_Size: req.body.Success_Stories_Description_Font_Size === '' ? viewdata[0].Success_Stories_Description_Font_Size : req.body.Success_Stories_Description_Font_Size,
                Success_Stories_Description_Text_Align: req.body.Success_Stories_Description_Text_Align === '' ? viewdata[0].Success_Stories_Description_Text_Align : req.body.Success_Stories_Description_Text_Align,
                Success_Stories_Description_Text_Decoration: req.body.Success_Stories_Description_Text_Decoration === '' ? viewdata[0].Success_Stories_Description_Text_Decoration : req.body.Success_Stories_Description_Text_Decoration,
                Success_Stories_Description_Color: req.body.Success_Stories_Description_Color === '' ? viewdata[0].Success_Stories_Description_Color : req.body.Success_Stories_Description_Color,
                Success_Stories_Description_Text_Line: req.body.Success_Stories_Description_Text_Line === '' ? viewdata[0].Success_Stories_Description_Text_Line : req.body.Success_Stories_Description_Text_Line,
                Success_Stories_Card_Section_Description_Heading: req.body.Success_Stories_Card_Section_Description_Heading === '' ? viewdata[0].Success_Stories_Card_Section_Description_Heading : req.body.Success_Stories_Card_Section_Description_Heading,
            })
            if (updatedata.modifiedCount > 0) {
                let viewdata = await homesuccessstoriesmodel.find({ _id: req.body._id });
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                console.log(viewdata[0].Success_Stories_Card_Image)
                updatesuccessstoriesdata(req.body)
            }
            else {
                res.send({
                    Status: 0,
                    Message: "Data Doesn't Updated"
                })
            }
        }
    }
}




let updatesuccessstoriesdata = async (req) => {
    let viewdata = await homesuccessstoriesmodel.find();
    console.log(viewdata)
    let updatedata = await homesuccessstoriesmodel.updateMany({ Sub_id: "1" }, {
        Success_Stories_Card_Section_Name_Text_Bold: req.Success_Stories_Card_Section_Name_Text_Bold === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Bold : req.Success_Stories_Card_Section_Name_Text_Bold,
        Success_Stories_Card_Section_Name_Font_Size: req.Success_Stories_Card_Section_Name_Font_Size === '' ? viewdata[0].Success_Stories_Card_Section_Name_Font_Size : req.Success_Stories_Card_Section_Name_Font_Size,
        Success_Stories_Card_Section_Name_Text_Align: req.Success_Stories_Card_Section_Name_Text_Align === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Align : req.Success_Stories_Card_Section_Name_Text_Align,
        Success_Stories_Card_Section_Name_Text_Decoration: req.Success_Stories_Card_Section_Name_Text_Decoration === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Decoration : req.Success_Stories_Card_Section_Name_Text_Decoration,
        Success_Stories_Card_Section_Home_Name_Color: req.Success_Stories_Card_Section_Home_Name_Color === '' ? viewdata[0].Success_Stories_Card_Section_Home_Name_Color : req.Success_Stories_Card_Section_Home_Name_Color,
        Success_Stories_Card_Section_Name_Text_Line: req.Success_Stories_Card_Section_Name_Text_Line === '' ? viewdata[0].Success_Stories_Card_Section_Name_Text_Line : req.Success_Stories_Card_Section_Name_Text_Line,

        Success_Stories_Marriage_Date_Text_Bold: req.Success_Stories_Marriage_Date_Text_Bold === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Bold : req.Success_Stories_Marriage_Date_Text_Bold,
        Success_Stories_Marriage_Date_Font_Size: req.Success_Stories_Marriage_Date_Font_Size === '' ? viewdata[0].Success_Stories_Marriage_Date_Font_Size : req.Success_Stories_Marriage_Date_Font_Size,
        Success_Stories_Marriage_Date_Text_Align: req.Success_Stories_Marriage_Date_Text_Align === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Align : req.Success_Stories_Marriage_Date_Text_Align,
        Success_Stories_Marriage_Date_Text_Decoration: req.Success_Stories_Marriage_Date_Text_Decoration === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Decoration : req.Success_Stories_Marriage_Date_Text_Decoration,
        Success_Stories_Marriage_Date_Color: req.Success_Stories_Marriage_Date_Color === '' ? viewdata[0].Success_Stories_Marriage_Date_Color : req.Success_Stories_Marriage_Date_Color,
        Success_Stories_Marriage_Date_Text_Line: req.Success_Stories_Marriage_Date_Text_Line === '' ? viewdata[0].Success_Stories_Marriage_Date_Text_Line : req.Success_Stories_Marriage_Date_Text_Line,


        Success_Stories_Description_Text_Bold: req.Success_Stories_Description_Text_Bold === '' ? viewdata[0].Success_Stories_Description_Text_Bold : req.Success_Stories_Description_Text_Bold,
        Success_Stories_Description_Font_Size: req.Success_Stories_Description_Font_Size === '' ? viewdata[0].Success_Stories_Description_Font_Size : req.Success_Stories_Description_Font_Size,
        Success_Stories_Description_Text_Align: req.Success_Stories_Description_Text_Align === '' ? viewdata[0].Success_Stories_Description_Text_Align : req.Success_Stories_Description_Text_Align,
        Success_Stories_Description_Text_Decoration: req.Success_Stories_Description_Text_Decoration === '' ? viewdata[0].Success_Stories_Description_Text_Decoration : req.Success_Stories_Description_Text_Decoration,
        Success_Stories_Description_Color: req.Success_Stories_Description_Color === '' ? viewdata[0].Success_Stories_Description_Color : req.Success_Stories_Description_Color,
        Success_Stories_Description_Text_Line: req.Success_Stories_Description_Text_Line === '' ? viewdata[0].Success_Stories_Description_Text_Line : req.Success_Stories_Description_Text_Line,
    })
}