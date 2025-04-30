const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const registersmodel = require('../../model/web/RegisterModel');
const createprofilemodel = require('../../model/web/CreateProfileModel');
const professionalmodel = require('../../model/web/ProfessionalModel');
const residentialmodel = require('../../model/web/Residentialinfo');
const familyinfomodel = require('../../model/web/FamilyModel');

const finalpath = path.join(__dirname, '../../../uploads')

require('dotenv').config()

let registerToken = process.env.REGISTERTOKEN



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APPPASSWORD,
    },
});


// async..await is not allowed in global scope, must use a wrapper
async function main(value) {
    console.log(value)
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `${process.env.EMAIL}`, // sender address
        to: `${value.Email}`, // list of receivers
        subject: "Your Shaadi Center OTP", // Subject line
        html: `
        Subject: Your One-Time Password (OTP) for Secure Access <br/><br/>

Dear ${value.Full_Name},<br/><br/>

Your one-time password (OTP) is: ${value.OTP_Value}<br/>

This OTP is valid for 5 minutes. Please do not share it with anyone.<br/>

If you did not request this code, please ignore this email or contact our support team immediately.<br/>

Best regards,<br/>
Shaadi Center

`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.registercontroller = async (req, res) => {
    if (
        req.body.Email === undefined
        || req.body.Phone_No === undefined
        || req.body.Password === undefined
    ) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        if (req.body.Email.includes('@') && req.body.Email.includes('.')) {
            if (req.body.Password.includes('@') || req.body.Password.includes('#') || req.body.Password.includes('!') || req.body.Password.includes('$') || req.body.Password.includes('%') || req.body.Password.includes('^') || req.body.Password.includes('&') || req.body.Password.includes('*') || req.body.Password.includes('(') || req.body.Password.includes(')') || req.body.Password.includes('-') || req.body.Password.includes('+') || req.body.Password.includes('=') || req.body.Password.includes('_') || req.body.Password.includes('|') || req.body.Password.includes(']') || req.body.Password.includes('[') || req.body.Password.includes('{') || req.body.Password.includes('}') || req.body.Password.includes(',') || req.body.Password.includes('.') || req.body.Password.includes('>') || req.body.Password.includes('<') || req.body.Password.includes('`') || req.body.Password.includes('~')) {

                let data = {
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Phone_No: req.body.Phone_No,
                    OTP_Value: Math.floor(1000 + Math.random() * 8000),
                    Expires_At: Date.now() + 5 * 60 * 1000,
                    Is_verified: false,
                    Form_Status: false,
                    Permitted: "false"
                }

                let insertdata = await registersmodel(data)
                insertdata.save()
                    .then(() => {
                        res.send({
                            Status: 1,
                            Message: "Registered Successfully",
                            data
                        })
                        main(data)
                    })
                    .catch((error) => {
                        if (error.code === 11000) {
                            res.send({
                                Status: 0,
                                Message: "Data Already Registered"
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
                    Message: "Missing Special Characters (@,#,$,%,^,!...)"
                })
            }
        }
        else {
            res.send({
                Status: 0,
                Message: "Invalid Email"
            })
        }
    }
}


exports.verifyotp = async (req, res) => {
    let data = {
        Email: req.body.Email,
        OTP_Value: req.body.OTP_Value
    }

    let viewdata = await registersmodel.findOne({ Email: data.Email, OTP_Value: data.OTP_Value })

    if (viewdata == null || viewdata == []) {
        res.send({
            Status: 0,
            Message: "Incorrect OTP"
        })
    }
    else {
        if (Date.now() >= viewdata.Expires_At) {
            res.send({
                Status: 0,
                Message: "OTP expires"
            })
        }
        else {
            let newtoken;
            jwt.sign({ newtoken }, registerToken, { expiresIn: '30m' }, (err, value) => {
                if (err) {
                    res.send({
                        Status: 0,
                        Message: "Something went wrong"
                    })
                }
                else {
                    res.cookie("Usersession", req.sessionID, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 30 }); // Store session ID in cookie
                    req.session._id = viewdata._id
                    res.send({
                        Status: 1,
                        Message: "Verified Successfully",
                        RegisterToken: value,
                        User_id: viewdata._id
                    })
                }
            })
        }
    }
}




exports.resendOTP = async (req, res) => {
    let data = {
        Email: req.body.Email,
        OTP_Value: Math.floor(1000 + Math.random() * 8000),
        Expires_At: Date.now() + 5 * 60 * 1000
    }

    let updatedata = await registersmodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expires_At: data.Expires_At })
    if (updatedata.modifiedCount === 1) {
        res.send({
            Status: 1,
            Message: "OTP resend successfully"
        })
        main(data)
    }
    else {
        res.send({
            Status: 0,
            Message: "Sorry Can't resend OTP"
        })
    }
}




exports.checksession = (req, res) => {

    if (!req.session._id) {
        return res.send({ Status: 0, message: "Session expired" });
    }
    else {
        res.send({
            Status: 1,
            message: "Session active",
            _id: req.session._id
        });
    }
};



exports.createprofile = async (req, res) => {
    if (req.body.Date_Of_Birth) {
        const dob = new Date(req.body.Date_Of_Birth);     // Convert DOB string to Date object
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear()
        let monthDiff = today.getMonth() - dob.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (req.files[0] === undefined || req.body.Profile_For == 0 || req.body.Gender == 0 || req.body.Height == 0 || req.body.Religion == 0 || req.body.Mother_Tongue == 0 || req.body.Caste == 0) {
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

                if (age >= 21 && req.body.Gender === "Male" || age >= 18 && req.body.Gender === "Female") {
                    let data = {
                        Sub_id: req.body.Sub_id,
                        UserName: 'SHADICENTER' + Math.floor(1000000000 + Math.random() * 1000000000),
                        Profile_For: req.body.Profile_For,
                        Full_Name: req.body.Full_Name,
                        Gender: req.body.Gender,
                        Date_Of_Birth: req.body.Date_Of_Birth,
                        Age: age,
                        Height: req.body.Height,
                        Religion: req.body.Religion,
                        Mother_Tongue: req.body.Mother_Tongue,
                        Caste: req.body.Caste,
                        Profile_Picture: req.files[0].filename,
                        About_Myself: req.body.About_Myself,
                        Marital_Status: req.body.Marital_Status,
                        Body_Type: req.body.Body_Type,
                        Weight: req.body.Weight,
                        Physical_Status: req.body.Physical_Status,
                        Eating_Habits: req.body.Eating_Habits,
                        Drinking_Habits: req.body.Drinking_Habits,
                        Smoking_Habits: req.body.Smoking_Habits,
                    }

                    let insertdata = await createprofilemodel(data)
                    insertdata.save()
                        .then(() => {
                            res.send({
                                Status: 1,
                                Message: "Profile Created Successfully"
                            })
                            updateverified(data)
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
                                    Message: "Data 1 Missing"
                                })
                            }

                            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                        })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Invalid Age"
                    })
                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                }
            }
        }
    }
    else {
        if (req.files[0]) {
            res.send({
                Status: 0,
                Message: "Data  Missing"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Missing"
            })
        }
    }
}

let updateverified = async (value) => {
    let updatedata = await registersmodel.updateOne({ _id: value.Sub_id }, { Is_verified: true })
}



exports.addprofessionaldetails = async (req, res) => {
    let data = {
        Sub_id: req.body.Sub_id,
        Highest_Education: req.body.Highest_Education,
        Education_Details: req.body.Education_Details,
        Institution_Name: req.body.Institution_Name,
        Occupation_Name: req.body.Occupation_Name,
        Occupation_Details: req.body.Occupation_Details,
        Organization_Name: req.body.Organization_Name,
        Sector: req.body.Sector,
        Salary: req.body.Salary
    }

    let insertdata = await professionalmodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Submitted Successfully"
            })
            updateformstatus(data)
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



exports.addresidentialinfo = async (req, res) => {

    if (req.files[0] === undefined) {
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

            let data = {
                Sub_id: req.body.Sub_id,
                Country: req.body.Country,
                State: req.body.State,
                District: req.body.District,
                Address: req.body.Address,
                Citizenship: req.body.Citizenship,
                Address_Proof: req.files[0].filename
            }

            let insertdata = await residentialmodel(data)
            insertdata.save()
                .then(() => {
                    res.send({
                        Status: 1,
                        Message: "Submitted Successfully"
                    })
                    updateformstatus(data)
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

                    fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
                })
        }
    }
}



exports.addfamilyinfocontroller = async (req, res) => {
    console.log(req.body)
    let data = {
        Sub_id: req.body.Sub_id,
        Family_Values: req.body.Family_Values,
        Family_Type: req.body.Family_Type,
        Family_Status: req.body.Family_Status,
        No_Of_Children: req.body.No_Of_Children,
        Father_Name: req.body.Father_Name,
        Mother_Name: req.body.Mother_Name,
        Father_Designation: req.body.Father_Designation,
        Mother_Designation: req.body.Mother_Designation,
        No_Of_Brothers: req.body.No_Of_Brothers,
        No_Of_Sisters: req.body.No_Of_Sisters
    }

    let insertdata = await familyinfomodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Profile Successfully Created"
            })
            updateformstatus(data)
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

let updateformstatus = async (value) => {
    let viewdata = await registersmodel.find({ _id: value.Sub_id })
    let updatedata = await registersmodel.updateOne({ _id: value.Sub_id }, { Form_Status: viewdata[0].Form_Status + 1 })
}


exports.logincontrol = async (req, res) => {
    let data = {
        Email: req.body.Email,
        Password: req.body.Password
    }

    let viewdata = await registersmodel.find({ Email: data.Email, Password: data.Password })
    if (viewdata === null || viewdata.length === 0) {
        res.send({
            Status: 0,
            Message: "Incorrect Email or Password"
        })

    }
    else {
        if (viewdata[0].Is_verified === false) {
            res.send({
                Status: 2,
                Message: "User Doesn,t Verified",
                Email: viewdata[0].Email
            })
            resendotp(viewdata[0])
        }

        else {
            let profiledata = await createprofilemodel.find({ Sub_id: viewdata[0]._id })
            if (profiledata === null || profiledata.length === 0) {
                res.send({
                    Status: 2,
                    Message: "User Doesn,t Exists",
                    Email: viewdata[0].Email
                })
                resendotp(viewdata[0])
            }

            else {
                console.log(viewdata[0].Form_Status)
                if (viewdata[0].Form_Status >= 3 && viewdata[0].Permitted == "false") {
                    res.send({
                        Status: 0,
                        Message: "Request In Process"
                    })
                }


                else if (viewdata[0].Permitted == "Blocked") {
                    res.send({
                        Status: 0,
                        Message: "Temporarily Blocked"
                    })
                }

                else {
                    let newtoken;
                    jwt.sign({ newtoken }, registerToken, { expiresIn: '1h' }, (err, value) => {
                        if (err) {
                            res.send({
                                Status: 0,
                                Message: "Something went wrong"
                            })
                        }
                        else {
                            res.cookie("Usersession", req.sessionID, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 30 }); // Store session ID in cookie
                            req.session._id = viewdata[0]._id
                            res.send({
                                Status: 1,
                                Message: "User Verified Successfully",
                                RegisterToken: value,
                                User_id: viewdata[0]._id,
                                Form_Status: viewdata[0].Form_Status
                            })
                        }
                    })
                }

            }
        }
    }
}


let resendotp = async (req) => {
    let data = {
        Email: req.Email,
        OTP_Value: Math.floor(1000 + Math.random() * 8000),
        Expires_At: Date.now() + 5 * 60 * 1000
    }

    let updatedata = await registersmodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expires_At: data.Expires_At })
    if (updatedata.modifiedCount === 1) {
        main(data)
    }
    else {
        return {
            Status: 0,
            Message: "Sorry Can't resend OTP"
        }

    }
}





exports.findregisters = async (req, res) => {
    let data = {
        Email: req.body.Email,
        OTP_Value: Math.floor(1000 + Math.random() * 8000),
        Expires_At: Date.now() + 5 * 60 * 1000
    }

    let viewdata = await registersmodel.find({ Email: data.Email })

    if (viewdata === null || viewdata.length === 0) {
        res.send({
            Status: 0,
            Message: "User Doesn't Exists"
        })
    }
    else {

        let updatedata = await registersmodel.updateOne({ Email: data.Email }, { OTP_Value: data.OTP_Value, Expires_At: data.Expires_At })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "User Verified Successfully",
                Email: data.Email
            })
            main(data)
        }
        else {
            return {
                Status: 0,
                Message: "Sorry Can't resend OTP"
            }

        }
    }
}


exports.changepassword = async (req, res) => {
    let viewdata = await registersmodel.find({ _id: req.body._id })
    let data = {
        _id: viewdata[0]._id,
        Password: req.body.Password,
        Confirm_Password: req.body.Confirm_Password
    }

    if (data.Password !== data.Confirm_Password || data._id === '' || data._id === null || data.Password === '' || data.Password === null || data.Confirm_Password === '' || data.Confirm_Password === null) {
        res.send({
            Status: 0,
            Message: "Invalid Inputs"
        })
    }
    else {
        console.log(viewdata)
        if (viewdata === undefined || viewdata === null) {
            res.send({
                Status: 0,
                Message: "Incorrect Email or Password"
            })
        }
        else {
            let updatedata = await registersmodel.updateOne({ _id: viewdata[0]._id }, { Password: data.Password })
            if (updatedata.modifiedCount === 1) {
                res.send({
                    Status: 1,
                    Message: "Password Changed Successfully",
                })
            }
            else {
                return {
                    Status: 0,
                    Message: "Sorry Can't Changed Password"
                }

            }

        }
    }
}




exports.viewuserprofile = async (req, res) => {
    try {
        let data = {
            _id: req.body._id || ""
        }

        if (data._id === undefined || data._id === "") {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            var viewregister = await registersmodel.findOne({ _id: data._id })
            var profiledata = await createprofilemodel.findOne({ Sub_id: viewregister._id })
            var professionaldata = await professionalmodel.findOne({ Sub_id: viewregister._id })
            var residentialdata = await residentialmodel.findOne({ Sub_id: viewregister._id }).select('-Address_Proof')
            var familydata = await familyinfomodel.findOne({ Sub_id: viewregister._id })
            res.send({
                viewregister,
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



exports.updateaboutmyself = async (req, res) => {
    let data = {
        _id: req.body._id,
        About_Myself: req.body.About_Myself
    }

    if (data.About_Myself === undefined || data.About_Myself === null || !data.About_Myself || data.About_Myself === " ") {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let updatedata = await createprofilemodel.updateOne({ Sub_id: data._id }, { About_Myself: data.About_Myself })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
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




exports.updateprofilephoto = async (req, res) => {
    let data = {
        _id: req.body._id,
        Profile_Picture: req.files[0].filename
    }

    if (req.files === undefined || req.files[0] === null) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let viewdata = await createprofilemodel.findOne({ Sub_id: data._id })
        console.log(viewdata)
        let updatedata = await createprofilemodel.updateOne({ Sub_id: data._id }, { Profile_Picture: data.Profile_Picture })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
            })
            fs.unlinkSync(`${finalpath}/${viewdata.Profile_Picture}`)
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn't Updated"
            })
            fs.unlinkSync(`${finalpath}/${req.files[0].filename}`)
        }
    }
}





exports.updateaboutbasic = async (req, res) => {
    let data = {
        Sub_id: req.body.Sub_id,
        Marital_Status: req.body.Marital_Status,
        Profile_For: req.body.Profile_For,
        Full_Name: req.body.Full_Name,
        Gender: req.body.Gender,
        Date_Of_Birth: req.body.Date_Of_Birth,
        Body_Type: req.body.Body_Type,
        Height: req.body.Height,
        Weight: req.body.Weight,
        Physical_Status: req.body.Physical_Status,
        Eating_Habits: req.body.Eating_Habits,
        Drinking_Habits: req.body.Drinking_Habits,
        Smoking_Habits: req.body.Smoking_Habits,
        Religion: req.body.Religion,
        Mother_Tongue: req.body.Mother_Tongue,
        Caste: req.body.Caste,
    }

    console.log(data)

    if (data.Marital_Status === undefined || data.Marital_Status === null || !data.Marital_Status || data.Marital_Status === " " ||
        data.Profile_For === undefined || data.Profile_For === null || !data.Profile_For || data.Profile_For === " " ||
        data.Full_Name === undefined || data.Full_Name === null || !data.Full_Name || data.Full_Name === " " ||
        data.Gender === undefined || data.Gender === null || !data.Gender || data.Gender === " " ||
        data.Date_Of_Birth === undefined || data.Date_Of_Birth === null || !data.Date_Of_Birth || data.Date_Of_Birth === " " ||
        data.Body_Type === undefined || data.Body_Type === null || !data.Body_Type || data.Body_Type === " " ||
        data.Height === undefined || data.Height === null || !data.Height || data.Height === " " ||
        data.Weight === undefined || data.Weight === null || !data.Weight || data.Weight === " " ||
        data.Physical_Status === undefined || data.Physical_Status === null || !data.Physical_Status || data.Physical_Status === " " ||
        data.Eating_Habits === undefined || data.Eating_Habits === null || !data.Eating_Habits || data.Eating_Habits === " " ||
        data.Drinking_Habits === undefined || data.Drinking_Habits === null || !data.Drinking_Habits || data.Drinking_Habits === " " ||
        data.Smoking_Habits === undefined || data.Smoking_Habits === null || !data.Smoking_Habits || data.Smoking_Habits === "" ||
        data.Religion === undefined || data.Religion === null || !data.Religion || data.Religion === " " ||
        data.Mother_Tongue === undefined || data.Mother_Tongue === null || !data.Mother_Tongue || data.Mother_Tongue === " " ||
        data.Caste === undefined || data.Caste === null || !data.Caste || data.Caste === " "
    ) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let updatedata = await createprofilemodel.updateOne({ Sub_id: data.Sub_id }, {
            Marital_Status: req.body.Marital_Status,
            Profile_For: req.body.Profile_For,
            Full_Name: req.body.Full_Name,
            Gender: req.body.Gender,
            Date_Of_Birth: req.body.Date_Of_Birth,
            Body_Type: req.body.Body_Type,
            Height: req.body.Height,
            Weight: req.body.Weight,
            Physical_Status: req.body.Physical_Status,
            Eating_Habits: req.body.Eating_Habits,
            Drinking_Habits: req.body.Drinking_Habits,
            Smoking_Habits: req.body.Smoking_Habits,
            Religion: req.body.Religion,
            Mother_Tongue: req.body.Mother_Tongue,
            Caste: req.body.Caste,
        })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "Data Doesn't Updated"
            })
        }
    }
}



exports.updateaboutprofessional = async (req, res) => {
    let data = {
        Sub_id: req.body.Sub_id,
        Highest_Education: req.body.Highest_Education,
        Education_Details: req.body.Education_Details,
        Institution_Name: req.body.Institution_Name,
        Occupation_Name: req.body.Occupation_Name,
        Occupation_Details: req.body.Occupation_Details,
        Organization_Name: req.body.Organization_Name,
        Sector: req.body.Sector,
        Salary: req.body.Salary
    }

    if (data.Highest_Education === undefined || data.Highest_Education === null || !data.Highest_Education || data.Highest_Education === " " ||
        data.Education_Details === undefined || data.Education_Details === null || !data.Education_Details || data.Education_Details === " " ||
        data.Institution_Name === undefined || data.Institution_Name === null || !data.Institution_Name || data.Institution_Name === " " ||
        data.Occupation_Name === undefined || data.Occupation_Name === null || !data.Occupation_Name || data.Occupation_Name === " " ||
        data.Occupation_Details === undefined || data.Occupation_Details === null || !data.Occupation_Details || data.Occupation_Details === " " ||
        data.Organization_Name === undefined || data.Organization_Name === null || !data.Organization_Name || data.Organization_Name === " " ||
        data.Sector === undefined || data.Sector === null || !data.Sector || data.Sector === " " ||
        data.Salary === undefined || data.Salary === null || !data.Salary || data.Salary === " "
    ) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let updatedata = await professionalmodel.updateOne({ Sub_id: data.Sub_id }, {
            Highest_Education: req.body.Highest_Education || "",
            Education_Details: req.body.Education_Details || "",
            Institution_Name: req.body.Institution_Name || "",
            Occupation_Name: req.body.Occupation_Name || "",
            Occupation_Details: req.body.Occupation_Details || "",
            Organization_Name: req.body.Organization_Name || "",
            Sector: req.body.Sector || "",
            Salary: req.body.Salary || ""
        })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "Data Doesn't Updated"
            })
        }
    }
}





exports.updateaboutcontact = async (req, res) => {
    let data = {
        Sub_id: req.body.Sub_id,
        Country: req.body.Country,
        State: req.body.State,
        District: req.body.District,
        Address: req.body.Address,
        Citizenship: req.body.Citizenship
    }

    if (
        data.Country === undefined || data.Country === null || !data.Country || data.Country === " " ||
        data.State === undefined || data.State === null || !data.State || data.State === " " ||
        data.District === undefined || data.District === null || !data.District || data.District === " " ||
        data.Address === undefined || data.Address === null || !data.Address || data.Address === " " ||
        data.Citizenship === undefined || data.Citizenship === null || !data.Citizenship || data.Citizenship === " "
    ) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let updatedata = await residentialmodel.updateOne({ Sub_id: data.Sub_id }, {
            Country: req.body.Country || "",
            State: req.body.State || "",
            District: req.body.District || "",
            Address: req.body.Address || "",
            Citizenship: req.body.Citizenship || "",
        })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "Data Doesn't Updated"
            })
        }
    }
}






exports.updateaboutfamilydetails = async (req, res) => {
    let data = {
        Sub_id: req.body.Sub_id,
        Family_Values: req.body.Family_Values,
        Family_Type: req.body.Family_Type,
        Family_Status: req.body.Family_Status,
        Any_Disability: req.body.Any_Disability,
        No_Of_Children: req.body.No_Of_Children,
        Father_Name: req.body.Father_Name,
        Mother_Name: req.body.Mother_Name,
        Father_Designation: req.body.Father_Designation,
        Mother_Designation: req.body.Mother_Designation,
        No_Of_Sisters: req.body.No_Of_Sisters,
        No_Of_Brothers: req.body.No_Of_Brothers
    }

    if (
        data.Family_Values === undefined || data.Family_Values === null || !data.Family_Values || data.Family_Values === " " ||
        data.Family_Type === undefined || data.Family_Type === null || !data.Family_Type || data.Family_Type === " " ||
        data.Family_Status === undefined || data.Family_Status === null || !data.Family_Status || data.Family_Status === " " ||
        data.Any_Disability === undefined || data.Any_Disability === null || !data.Any_Disability || data.Any_Disability === " " ||
        data.No_Of_Children === undefined || data.No_Of_Children === null || !data.No_Of_Children || data.No_Of_Children === " " ||
        data.Father_Name === undefined || data.Father_Name === null || !data.Father_Name || data.Father_Name === " " ||
        data.Mother_Name === undefined || data.Mother_Name === null || !data.Mother_Name || data.Mother_Name === " " ||
        data.Father_Designation === undefined || data.Father_Designation === null || !data.Father_Designation || data.Father_Designation === " " ||
        data.Mother_Designation === undefined || data.Mother_Designation === null || !data.Mother_Designation || data.Mother_Designation === " " ||
        data.No_Of_Sisters === undefined || data.No_Of_Sisters === null || !data.No_Of_Sisters || data.No_Of_Sisters === " " ||
        data.No_Of_Brothers === undefined || data.No_Of_Brothers === null || !data.No_Of_Brothers || data.No_Of_Brothers === " "
    ) {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
    else {
        let updatedata = await familyinfomodel.updateOne({ Sub_id: data.Sub_id }, {
            Sub_id: req.body.Sub_id,
            Family_Values: req.body.Family_Values,
            Family_Type: req.body.Family_Type,
            Family_Status: req.body.Family_Status,
            Any_Disability: req.body.Any_Disability,
            No_Of_Children: req.body.No_Of_Children,
            Father_Name: req.body.Father_Name,
            Mother_Name: req.body.Mother_Name,
            Father_Designation: req.body.Father_Designation,
            Mother_Designation: req.body.Mother_Designation,
            No_Of_Sisters: req.body.No_Of_Sisters,
            No_Of_Brothers: req.body.No_Of_Brothers
        })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 1,
                Message: "Data Doesn't Updated"
            })
        }
    }
}




// header controllers
exports.logoutcontroller = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({
                Status: 0,
                Message: "Can't Logging Out"
            })
        }
        else {
            res.clearCookie('session')
            res.send({
                Status: 1,
                Message: "Logout Successfully"
            })
        } // Name may vary
    });
};


exports.headerdata = async (req, res) => {
    try {
        let data = {
            _id: req.body._id
        }

        if (data._id === undefined || data._id === "") {
            res.send({
                Status: 0,
                Message: "No User Found"
            })
        }
        else {
            var viewregister = await registersmodel.findOne({ _id: data._id })
            var profiledata = await createprofilemodel.findOne({ Sub_id: viewregister._id })
            res.send({
                Full_Name: profiledata.Full_Name,
                UserName: viewregister.UserName,
                Profile_Picture: profiledata.Profile_Picture,
                UserName: profiledata.UserName,
                _imgurl: "http://localhost:5000/uploads/"
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