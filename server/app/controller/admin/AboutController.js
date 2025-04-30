const fs = require('fs')
let path = require('path')
const aboutbannermodel = require("../../model/admin/AboutBannerModel")
const AboutParagraphModel = require('../../model/admin/AboutParagraphModel')
const AboutSubParagraphModel = require('../../model/admin/AboutSubParagraphModel')


const finalpath = path.join(__dirname, '../../../uploads')
exports.addaboutbannercontroller = async (req, res) => {
    if (req.files === undefined || req.files[0] === undefined) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let viewdata = await aboutbannermodel.find()
        if (viewdata.length === 0) {
            let data = {
                AboutBanner: req.files[0].filename,
                AboutBanner_Heading: req.body.AboutBanner_Heading != '' ? req.body.AboutBanner_Heading : "About Us",
                AboutBanner_Overlay: req.body.AboutBanner_Overlay != '' ? req.body.AboutBanner_Overlay : "#000000",
                AboutBanner_Overlay_Transparency: req.body.AboutBanner_Overlay_Transparency != '' ? req.body.AboutBanner_Overlay_Transparency : "20",
                AboutHeading_Font_Bold: req.body.AboutHeading_Font_Bold != '' ? req.body.AboutHeading_Font_Bold : 700,
                AboutHeading_Font_Size: req.body.AboutHeading_Font_Size != '' ? req.body.AboutHeading_Font_Size : 40,
                AboutHeading_Text_Align: req.body.AboutHeading_Text_Align != '' ? req.body.AboutHeading_Text_Align : "center",
                AboutHeading_Text_Decoration: req.body.AboutHeading_Text_Decoration != '' ? req.body.AboutHeading_Text_Decoration : "none",
                AboutHeading_Text_Color: req.body.AboutHeading_Text_Color != '' ? req.body.AboutHeading_Text_Color : "#ffffff",
                AboutHeading_Line_Height: req.body.AboutHeading_Line_Height != '' ? req.body.AboutHeading_Line_Height : 30
            }
            let insertdata = await aboutbannermodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Data Inserted Successfully"
                    })
                })
                .catch((error) => {
                    if (error.code === 11000) {
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
        else {
            res.send({
                Status: 0,
                Message: "Data Already Exists"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
    }
}



exports.viewaboutbanner = async (req, res) => {
    // https://api.shaadicenter.org/uploads/
    let viewdata = await aboutbannermodel.find()
    let url = "http://localhost:5000/uploads/"
    res.send({ viewdata, url })
}







exports.updateaboutbanner = async (req, res) => {
    let viewdata = await aboutbannermodel.find();
    if (req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }

        let updatedata = await aboutbannermodel.updateOne({ _id: data._id }, {
            AboutBanner_Heading: req.body.AboutBanner_Heading != '' ? req.body.AboutBanner_Heading : viewdata[0].AboutBanner_Heading,
            AboutBanner_Overlay: req.body.AboutBanner_Overlay != '' ? req.body.AboutBanner_Overlay : viewdata[0].AboutBanner_Overlay,
            AboutBanner_Overlay_Transparency: req.body.AboutBanner_Overlay_Transparency != '' ? req.body.AboutBanner_Overlay_Transparency : viewdata[0].AboutBanner_Overlay_Transparency,
            AboutHeading_Font_Bold: req.body.AboutHeading_Font_Bold != '' ? req.body.AboutHeading_Font_Bold : viewdata[0].AboutHeading_Font_Bold,
            AboutHeading_Font_Size: req.body.AboutHeading_Font_Size != '' ? req.body.AboutHeading_Font_Size : viewdata[0].AboutHeading_Font_Size,
            AboutHeading_Text_Align: req.body.AboutHeading_Text_Align != '' ? req.body.AboutHeading_Text_Align : viewdata[0].AboutHeading_Text_Align,
            AboutHeading_Text_Decoration: req.body.AboutHeading_Text_Decoration != '' ? req.body.AboutHeading_Text_Decoration : viewdata[0].AboutHeading_Text_Decoration,
            AboutHeading_Text_Color: req.body.AboutHeading_Text_Color != '' ? req.body.AboutHeading_Text_Color : viewdata[0].AboutHeading_Text_Color,
            AboutHeading_Line_Height: req.body.AboutHeading_Line_Height != '' ? req.body.AboutHeading_Line_Height : viewdata[0].AboutHeading_Line_Height
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

            let updatedata = await aboutbannermodel.updateOne({ _id: data._id }, {
                AboutBanner: req.files[0].filename,
                AboutBanner_Heading: req.body.AboutBanner_Heading != '' ? req.body.AboutBanner_Heading : viewdata[0].AboutBanner_Heading,
                AboutBanner_Overlay: req.body.AboutBanner_Overlay != '' ? req.body.AboutBanner_Overlay : viewdata[0].AboutBanner_Overlay,
                AboutBanner_Overlay_Transparency: req.body.AboutBanner_Overlay_Transparency != '' ? req.body.AboutBanner_Overlay_Transparency : viewdata[0].AboutBanner_Overlay_Transparency,
                AboutHeading_Font_Bold: req.body.AboutHeading_Font_Bold != '' ? req.body.AboutHeading_Font_Bold : viewdata[0].AboutHeading_Font_Bold,
                AboutHeading_Font_Size: req.body.AboutHeading_Font_Size != '' ? req.body.AboutHeading_Font_Size : viewdata[0].AboutHeading_Font_Size,
                AboutHeading_Text_Align: req.body.AboutHeading_Text_Align != '' ? req.body.AboutHeading_Text_Align : viewdata[0].AboutHeading_Text_Align,
                AboutHeading_Text_Decoration: req.body.AboutHeading_Text_Decoration != '' ? req.body.AboutHeading_Text_Decoration : viewdata[0].AboutHeading_Text_Decoration,
                AboutHeading_Text_Color: req.body.AboutHeading_Text_Color != '' ? req.body.AboutHeading_Text_Color : viewdata[0].AboutHeading_Text_Color,
                AboutHeading_Line_Height: req.body.AboutHeading_Line_Height != '' ? req.body.AboutHeading_Line_Height : viewdata[0].AboutHeading_Line_Height
            })
            if (updatedata.modifiedCount > 0) {
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                fs.unlinkSync(`${finalpath}/${viewdata[0].AboutBanner}`)
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








exports.addaboutparagraphcontroller = async (req, res) => {
    if (req.files === undefined || req.files[0] === undefined) {
        let data = {
            AboutParagraphHeading: req.body.AboutParagraphHeading,
            AboutParagraphHeadingFontBold: req.body.AboutParagraphHeadingFontBold != '' ? req.body.AboutParagraphHeadingFontBold : "400",
            AboutParagraphHeadingFontSize: req.body.AboutParagraphHeadingFontSize != '' ? req.body.AboutParagraphHeadingFontSize : 20,
            AboutParagraphHeadingFontAlign: req.body.AboutParagraphHeadingFontAlign != '' ? req.body.AboutParagraphHeadingFontAlign : "center",
            AboutParagraphHeadingTextDecoration: req.body.AboutParagraphHeadingTextDecoration != '' ? req.body.AboutParagraphHeadingTextDecoration : "none",
            AboutParagraphHeadingFontColor: req.body.AboutParagraphHeadingFontColor != '' ? req.body.AboutParagraphHeadingFontColor : "#000000",
            AboutParagraphHeadingLineHeight: req.body.AboutParagraphHeadingLineHeight != '' ? req.body.AboutParagraphHeadingLineHeight : 30,
        }
        console.log(data)
        let insertdata = await AboutParagraphModel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "Data Inserted Successfully"
                })
            })
            .catch((error) => {
                if (error.code === 11000) {
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
    else {
        let data = {
            AboutParagraphBanner: req.files[0].filename,
            AboutParagraphHeading: req.body.AboutParagraphHeading,
            AboutParagraphHeadingFontBold: req.body.AboutParagraphHeadingFontBold != '' ? req.body.AboutParagraphHeadingFontBold : "700",
            AboutParagraphHeadingFontSize: req.body.AboutParagraphHeadingFontSize != '' ? req.body.AboutParagraphHeadingFontSize : 40,
            AboutParagraphHeadingFontAlign: req.body.AboutParagraphHeadingFontAlign != '' ? req.body.AboutParagraphHeadingFontAlign : "center",
            AboutParagraphHeadingTextDecoration: req.body.AboutParagraphHeadingTextDecoration != '' ? req.body.AboutParagraphHeadingTextDecoration : "none",
            AboutParagraphHeadingFontColor: req.body.AboutParagraphHeadingFontColor != '' ? req.body.AboutParagraphHeadingFontColor : "#000000",
            AboutParagraphHeadingLineHeight: req.body.AboutParagraphHeadingLineHeight != '' ? req.body.AboutParagraphHeadingLineHeight : 30,
        }
        console.log(data)
        let insertdata = await AboutParagraphModel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "Data Inserted Successfully"
                })
            })
            .catch((error) => {
                if (error.code === 11000) {
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
}



exports.viewaboutparagraph = async (req, res) => {
    let viewdata = await AboutParagraphModel.find()
    let url = "http://localhost:5000/uploads/"
    res.send({ viewdata, url })
}





exports.updateaboutparagraph = async (req, res) => {
    console.log(req.files)
    let viewdata = await AboutParagraphModel.find();
    if (req.files === undefined || req.files[0] === undefined) {
        let data = {
            _id: req.body._id
        }
        console.log(data)
        let updatedata = await AboutParagraphModel.updateOne({ _id: data._id }, {
            AboutParagraphHeading: req.body.AboutParagraphHeading,
            AboutParagraphHeadingFontBold: req.body.AboutParagraphHeadingFontBold != '' ? req.body.AboutParagraphHeadingFontBold : viewdata[0].AboutParagraphHeadingFontBold,
            AboutParagraphHeadingFontSize: req.body.AboutParagraphHeadingFontSize != '' ? req.body.AboutParagraphHeadingFontSize : viewdata[0].AboutParagraphHeadingFontSize,
            AboutParagraphHeadingFontAlign: req.body.AboutParagraphHeadingFontAlign != '' ? req.body.AboutParagraphHeadingFontAlign : viewdata[0].AboutParagraphHeadingFontAlign,
            AboutParagraphHeadingTextDecoration: req.body.AboutParagraphHeadingTextDecoration != '' ? req.body.AboutParagraphHeadingTextDecoration : viewdata[0].AboutParagraphHeadingTextDecoration,
            AboutParagraphHeadingFontColor: req.body.AboutParagraphHeadingFontColor != '' ? req.body.AboutParagraphHeadingFontColor : viewdata[0].AboutParagraphHeadingFontColor,
            AboutParagraphHeadingLineHeight: req.body.AboutParagraphHeadingLineHeight != '' ? req.body.AboutParagraphHeadingLineHeight : viewdata[0].AboutParagraphHeadingLineHeight
        })
        console.log(req.body)
        if (updatedata.modifiedCount > 0) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
            updatesubparagraphheading({
                SubParagraphHeading: viewdata[0].AboutParagraphHeading,
                AboutParagraphHeading: req.body.AboutParagraphHeading
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

            let updatedata = await AboutParagraphModel.updateOne({ _id: data._id }, {
                AboutParagraphBanner: req.files[0].filename,
                AboutParagraphHeading: req.body.AboutParagraphHeading,
                AboutParagraphHeadingFontBold: req.body.AboutParagraphHeadingFontBold != '' ? req.body.AboutParagraphHeadingFontBold : viewdata[0].AboutParagraphHeadingFontBold,
                AboutParagraphHeadingFontSize: req.body.AboutParagraphHeadingFontSize != '' ? req.body.AboutParagraphHeadingFontSize : viewdata[0].AboutParagraphHeadingFontSize,
                AboutParagraphHeadingFontAlign: req.body.AboutParagraphHeadingFontAlign != '' ? req.body.AboutParagraphHeadingFontAlign : viewdata[0].AboutParagraphHeadingFontAlign,
                AboutParagraphHeadingTextDecoration: req.body.AboutParagraphHeadingTextDecoration != '' ? req.body.AboutParagraphHeadingTextDecoration : viewdata[0].AboutParagraphHeadingTextDecoration,
                AboutParagraphHeadingFontColor: req.body.AboutParagraphHeadingFontColor != '' ? req.body.AboutParagraphHeadingFontColor : viewdata[0].AboutParagraphHeadingFontColor,
                AboutParagraphHeadingLineHeight: req.body.AboutParagraphHeadingLineHeight != '' ? req.body.AboutParagraphHeadingLineHeight : viewdata[0].AboutParagraphHeadingLineHeight,
            })
            if (updatedata.modifiedCount > 0) {
                res.send({
                    Status: 1,
                    Message: "Data Updated Successfully"
                })
                fs.unlinkSync(`${finalpath}/${viewdata[0].AboutParagraphBanner}`)
                updatesubparagraphheading({
                    SubParagraphHeading: viewdata[0].AboutParagraphHeading,
                    AboutParagraphHeading: req.body.AboutParagraphHeading
                })
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


let updatesubparagraphheading = async (value) => {
    let updatedata = await AboutSubParagraphModel.updateOne({ AboutSubParagraphHeading: value.SubParagraphHeading }, { AboutSubParagraphHeading: value.AboutParagraphHeading })
}



exports.deleteparagraphheading = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await AboutParagraphModel.deleteOne({ _id: data._id })
    if (deletedata.deletedCount === 1) {
        if (req.body.AboutParagraphBanner) {
            fs.unlinkSync(`${finalpath}/${req.body.AboutParagraphBanner}`)
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "Data Deleted Successfully"
            })
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn't Deleted"
        })
    }
}




exports.addaboutsubparagraphcontroller = async (req, res) => {

    let data = {
        AboutSubParagraphHeading: req.body.AboutSubParagraphHeading,
        AboutParagraphSubHeading: req.body.AboutParagraphSubHeading,
        AboutParagraphSubHeadingFontBold: req.body.AboutParagraphSubHeadingFontBold != '' ? req.body.AboutParagraphSubHeadingFontBold : 400,
        AboutParagraphSubHeadingFontSize: req.body.AboutParagraphSubHeadingFontSize != '' ? req.body.AboutParagraphSubHeadingFontSize : 20,
        AboutParagraphSubHeadingFontAlign: req.body.AboutParagraphSubHeadingFontAlign != '' ? req.body.AboutParagraphSubHeadingFontAlign : "center",
        AboutParagraphSubHeadingTextDecoration: req.body.AboutParagraphSubHeadingTextDecoration != '' ? req.body.AboutParagraphSubHeadingTextDecoration : "none",
        AboutParagraphSubHeadingFontColor: req.body.AboutParagraphSubHeadingFontColor != '' ? req.body.AboutParagraphSubHeadingFontColor : "#000000",
        AboutParagraphSubHeadingLineHeight: req.body.AboutParagraphSubHeadingLineHeight != '' ? req.body.AboutParagraphSubHeadingLineHeight : 30
    }
    let insertdata = await AboutSubParagraphModel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Data Inserted Successfully"
            })
        })
        .catch((error) => {
            if (error.code === 11000) {
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


exports.viewsubaboutparagraph = async (req, res) => {
    let viewdata = await AboutSubParagraphModel.find()
    res.send({ viewdata })
}





exports.updateaboutsubparagraph = async (req, res) => {
    console.log(req.body)
    let viewdata = await AboutSubParagraphModel.find();
    let data = {
        _id: req.body._id
    }

    let updatedata = await AboutSubParagraphModel.updateOne({ _id: data._id }, {
        AboutSubParagraphHeading: req.body.AboutSubParagraphHeading,
        AboutParagraphSubHeading: req.body.AboutParagraphSubHeading != '' ? req.body.AboutParagraphSubHeading : viewdata[0].AboutParagraphSubHeading,
        AboutParagraphSubHeadingFontBold: req.body.AboutParagraphSubHeadingFontBold != '' ? req.body.AboutParagraphSubHeadingFontBold : viewdata[0].AboutParagraphSubHeadingFontBold,
        AboutParagraphSubHeadingFontSize: req.body.AboutParagraphSubHeadingFontSize != '' ? req.body.AboutParagraphSubHeadingFontSize : viewdata[0].AboutParagraphSubHeadingFontSize,
        AboutParagraphSubHeadingFontAlign: req.body.AboutParagraphSubHeadingFontAlign != '' ? req.body.AboutParagraphSubHeadingFontAlign : viewdata[0].AboutParagraphSubHeadingFontAlign,
        AboutParagraphSubHeadingTextDecoration: req.body.AboutParagraphSubHeadingTextDecoration != '' ? req.body.AboutParagraphSubHeadingTextDecoration : viewdata[0].AboutParagraphSubHeadingTextDecoration,
        AboutParagraphSubHeadingFontColor: req.body.AboutParagraphSubHeadingFontColor != '' ? req.body.AboutParagraphSubHeadingFontColor : viewdata[0].AboutParagraphSubHeadingFontColor,
        AboutParagraphSubHeadingLineHeight: req.body.AboutParagraphSubHeadingLineHeight != '' ? req.body.AboutParagraphSubHeadingLineHeight : viewdata[0].AboutParagraphSubHeadingLineHeight
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


exports.deleteaboutsubparagraph = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await AboutSubParagraphModel.deleteOne({ _id: data._id })
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