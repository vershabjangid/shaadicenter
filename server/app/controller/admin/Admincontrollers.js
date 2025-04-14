const jwt = require('jsonwebtoken');
const registersmodel = require('../../model/web/RegisterModel');
const path = require('path')
const finalpath = path.join(__dirname, '../../../uploads')
const fs = require('fs')
const religionmodel = require('../../model/admin/ReligionModel');
const castemodel = require('../../model/admin/CasteModel');
const mothertonguemodel = require('../../model/admin/MotherTongueModel');
const districtmodel = require('../../model/admin/DistrictModel');
const statemodel = require('../../model/admin/StateModel');
const countrymodel = require('../../model/admin/CountryModel');
const educationmodel = require('../../model/admin/Educationmodel');
const occupationmodel = require('../../model/admin/Occupationmodel');
const websitethememodel = require('../../model/admin/WebsiteThemes');
const professionalmodel = require('../../model/web/ProfessionalModel');
const { createprofile } = require('../web/WebAuth');
const createprofilemodel = require('../../model/web/CreateProfileModel');
const residentialmodel = require('../../model/web/Residentialinfo');
const familyinfomodel = require('../../model/web/FamilyModel');

require('dotenv').config()
const AdminToken = process.env.ADMINTOKEN;
const AdminPassword = process.env.ADMINPASSWORD;
const AdminEmail = process.env.ADMINEMAIL;


// here we create a admin login controller to authenticate admin here we generate jwt token for authenticate all api
exports.Adminlogin = (req, res) => {
    try {
        let data = {
            Email: req.body.Email,
            Password: req.body.Password
        }

        if (data.Email == AdminEmail && data.Password == AdminPassword && data.Email.includes('@') && data.Email.includes('.')) {
            let newtoken;
            jwt.sign({ newtoken }, AdminToken, { expiresIn: '1h' }, (err, value) => {
                if (err) {
                    res.send({
                        Status: 0,
                        Message: "Something Went Wrong"
                    })
                }
                else {

                    req.session.Email = data.Email
                    res.cookie("AdminSession", req.sessionID, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 30 }); // Store session ID in cookie
                    res.send({
                        Status: 1,
                        Message: "Login Successfully",
                        Token: value
                    })


                }
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Incorrect Email or Password"
            })
        }
    }
    catch (error) {
        if (error.TypeError) {
            res.send({
                Status: 0,
                Message: "Data Missing"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Incorrect Email or Password"
            })
        }
    }
}



exports.checkadminsession = (req, res) => {

    if (!req.session.Email) {
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


// users controller 
exports.viewadminusers = async (req, res) => {
    try {

        var viewregister = await registersmodel.find({ Form_Status: 3 }).select(["-Password", "-OTP_Value", "-Expires_At", "-Is_verified"])
        var profiledata = await createprofilemodel.find()
        var professionaldata = await professionalmodel.find()
        var residentialdata = await residentialmodel.find()
        var familydata = await familyinfomodel.find()
        res.send({
            viewregister,
            profiledata,
            professionaldata,
            residentialdata,
            familydata,
            imgurl: "http://localhost:5000/uploads/",
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


exports.updateuserspermit = async (req, res) => {
    let data = {
        _id: req.body._id,
        Permitted: req.body.Permitted
    }

    let updatedata = await registersmodel.updateOne({ _id: data._id }, { Permitted: data.Permitted })
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





exports.viewadminuserprofile = async (req, res) => {
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
            var residentialdata = await residentialmodel.findOne({ Sub_id: viewregister._id })
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



exports.deleteadminusers = async (req, res) => {
    fs.unlinkSync(`${finalpath}/${req.body.Address_Proof}`)
    fs.unlinkSync(`${finalpath}/${req.body.Profile_Picture}`)
    var viewregister = await registersmodel.deleteOne({ _id: req.body._id })
    var profiledata = await createprofilemodel.deleteOne({ Sub_id: req.body._id })
    var professionaldata = await professionalmodel.deleteOne({ Sub_id: req.body._id })
    var residentialdata = await residentialmodel.deleteOne({ Sub_id: req.body._id })
    var familydata = await familyinfomodel.deleteOne({ Sub_id: req.body._id })
    if (viewregister.deletedCount == 1 && profiledata.deletedCount == 1 && professionaldata.deletedCount == 1 && residentialdata.deletedCount == 1 && familydata.deletedCount == 1) {
        res.send({
            Status: 1,
            Message: "Deleted Successfully"
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Doesn't Deleted"
        })
    }
}
//religion controllers

exports.addreligion = async (req, res) => {
    let data = {
        Religion_Name: req.body.Religion_Name,
        Status: req.body.Status
    }

    let insertdata = await religionmodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Religion added successfully"
            })
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.send({
                    Status: 0,
                    Message: "Religion Already Exists"
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


exports.viewallreligion = async (req, res) => {
    let viewdata = await religionmodel.find()
    res.send(viewdata)
}


exports.viewactivereligion = async (req, res) => {
    let viewdata = await religionmodel.find({ Status: true }).select(["-Status", "-_id"])
    res.send(viewdata)
}



exports.deletereligion = async (req, res) => {
    let viewdata = await religionmodel.deleteOne({ _id: req.body._id })
    if (viewdata.deletedCount == 1) {
        res.send({
            Status: 1,
            Message: "Religion Deleted Successfully"
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Religion doesn't Deleted"
        })
    }
}




exports.updatereligion = async (req, res) => {
    let data = {
        _id: req.body._id,
        Religion_Name: req.body.Religion_Name,
        Status: req.body.Status
    }

    if (req.body.Religion_Name !== '' || req.body.Status == 0 || req.body.Status == 1) {
        let updatedata = await religionmodel.updateOne({ _id: req.body._id }, { Religion_Name: data.Religion_Name, Status: data.Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }
    else {
        res.send({
            Status: 5,
            Message: "Data Doesn,t Updated"
        })
    }
}


// caste controllers

exports.addcaste = async (req, res) => {
    let data = {
        Caste_Name: req.body.Caste_Name,
        Status: req.body.Status,
        Religion: req.body.Religion
    }

    let insertdata = await castemodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Caste added successfully"
            })
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.send({
                    Status: 0,
                    Message: "Caste Already Exists"
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



exports.viewcaste = async (req, res) => {
    let viewdata = await castemodel.find()
    res.send(viewdata)
}


exports.viewactivecaste = async (req, res) => {
    let viewdata = await castemodel.find({ Religion: req.body.data, Status: true }).select(["-Status", "-_id"])
    res.send(viewdata)
}

exports.deletecaste = async (req, res) => {
    let viewdata = await castemodel.deleteOne({ _id: req.body._id })
    if (viewdata.deletedCount == 1) {
        res.send({
            Status: 1,
            Message: "Caste Deleted Successfully"
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Caste doesn't Deleted"
        })
    }
}



exports.updatecaste = async (req, res) => {
    let data = {
        _id: req.body._id,
        Caste_Name: req.body.Caste_Name,
        Religion: req.body.Religion,
        Status: req.body.Status
    }


    if (req.body.Caste_Name != '' || req.body.Status == '0' || req.body.Status == '1') {
        let updatedata = await castemodel.updateOne({ _id: data._id }, { Caste_Name: data.Caste_Name, Religion: data.Religion, Status: data.Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn,t Updated"
        })
    }
}


// mother tongue controllers


exports.addmothertongue = async (req, res) => {
    let data = {
        MotherTongue_Name: req.body.MotherTongue_Name,
        Status: req.body.Status
    }

    let insertdata = await mothertonguemodel(data)
    insertdata.save()
        .then(() => {
            res.send({
                Status: 1,
                Message: "Mother Tongue added successfully"
            })
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.send({
                    Status: 0,
                    Message: "Mother Tongue Already Exists"
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


exports.viewmothertongue = async (req, res) => {
    let viewdata = await mothertonguemodel.find()
    res.send(viewdata)
}


exports.viewactivemothertongue = async (req, res) => {
    let viewdata = await mothertonguemodel.find({ Status: true }).select(["-Status", "-_id"])
    res.send(viewdata)
}


exports.deletemothertongue = async (req, res) => {
    let viewdata = await mothertonguemodel.deleteOne({ _id: req.body._id })
    if (viewdata.deletedCount == 1) {
        res.send({
            Status: 1,
            Message: "Mother Tongue Deleted Successfully"
        })
    }
    else {
        res.send({
            Status: 0,
            Message: "Mother Tongue  doesn't Deleted"
        })
    }
}


exports.updatemothertongue = async (req, res) => {
    let data = {
        _id: req.body._id,
        MotherTongue_Name: req.body.MotherTongue_Name,
        Status: req.body.Status
    }


    if (req.body.MotherTongue_Name != '' || req.body.Status == '0' || req.body.Status == '1') {
        let updatedata = await mothertonguemodel.updateOne({ _id: data._id }, { MotherTongue_Name: data.MotherTongue_Name, Status: data.Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn,t Updated"
        })
    }
}



// regions controller 

exports.addregions = async (req, res) => {
    let data = {
        Country_Name: req.body.Country_Name,
        Country_Status: req.body.Country_Status,

        State_Name: req.body.State_Name,
        Country_Name1: req.body.Country_Name1,
        State_Status: req.body.State_Status,

        District_Name: req.body.District_Name,
        Country_Name2: req.body.Country_Name2,
        State_Name1: req.body.State_Name1,
        District_Status: req.body.District_Status
    }


    if (req.body.Country_Name && req.body.Country_Status) {
        let insertdata = await countrymodel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "Country Added Successfully"
                })
            })
            .catch((error) => {
                if (error.code == 11000) {
                    res.send({
                        Status: 0,
                        Message: "Country Already Exists"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data Missing1"
                    })
                }
            })
    }
    else if (req.body.Country_Name1 && req.body.State_Status) {
        let insertdata = await statemodel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "State Added Successfully"
                })
            })
            .catch((error) => {
                if (error.code == 11000) {
                    res.send({
                        Status: 0,
                        Message: "State Already Exists"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data Missing2"
                    })
                }
            })
    }

    else if (req.body.Country_Name2 && req.body.District_Status) {
        let insertdata = await districtmodel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "District Added Successfully"
                })
            })
            .catch((error) => {
                if (error.code == 11000) {
                    res.send({
                        Status: 0,
                        Message: "District Already Exists"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Data Missing3"
                    })
                }
            })
    }

    else {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }
}



exports.viewallcountries = async (req, res) => {
    let viewdata = await countrymodel.find()
    res.send(viewdata)
}

exports.viewactivecountries = async (req, res) => {
    let viewdata = await countrymodel.find({ Country_Status: true })
    res.send(viewdata)
}


exports.viewallstates = async (req, res) => {
    let viewdata = await statemodel.find()
    res.send(viewdata)
}

exports.viewactivestates = async (req, res) => {
    let viewdata = await statemodel.find({ Country_Name1: req.body.data, State_Status: true })
    res.send(viewdata)
}


exports.viewalldistricts = async (req, res) => {
    let viewdata = await districtmodel.find()
    res.send(viewdata)
}

exports.viewactivedistricts = async (req, res) => {
    let viewdata = await districtmodel.find({ State_Name1: req.body.data, District_Status: true })
    res.send(viewdata)
}



exports.updateregions = async (req, res) => {
    let data = {
        _id: req.body._id,
        Country_Name: req.body.Country_Name,
        Country_Status: req.body.Country_Status,

        State_Name: req.body.State_Name,
        Country_Name1: req.body.Country_Name1,
        State_Status: req.body.State_Status,

        District_Name: req.body.District_Name,
        Country_Name2: req.body.Country_Name2,
        State_Name1: req.body.State_Name1,
        District_Status: req.body.District_Status
    }


    if (req.body.Country_Name && req.body.Country_Status || req.body.Country_Name != '' && req.body.Country_Status == '0' || req.body.Country_Status == '1') {
        let updatedata = await countrymodel.updateOne({ _id: data._id }, { Country_Name: data.Country_Name, Country_Status: data.Country_Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }


    else if (req.body.State_Name && req.body.Country_Name1 && req.body.State_Status || req.body.Country_Name1 != '' && req.body.State_Status == '0' || req.body.State_Status == '1') {
        let updatedata = await statemodel.updateOne({ _id: data._id }, { State_Name: data.State_Name, Country_Name1: data.Country_Name1, State_Status: data.State_Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }


    else if (req.body.District_Name && req.body.Country_Name2 && req.body.State_Name1 && req.body.District_Status || req.body.Country_Name2 != '' && req.body.District_Status == '0' || req.body.District_Status == '1') {
        let updatedata = await districtmodel.updateOne({ _id: data._id }, { District_Name: data.District_Name, Country_Name2: data.Country_Name2, State_Name1: data.State_Name1, District_Status: data.District_Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }

    else {
        res.send({
            Status: 0,
            Message: "Data Doesn,t Updated"
        })
    }
}




exports.deleteregion = async (req, res) => {
    if (req.body.Country_Name && req.body.Country_Status) {
        let viewdata = await countrymodel.deleteOne({ _id: req.body._id })
        if (viewdata.deletedCount == 1) {
            res.send({
                Status: 1,
                Message: "Country Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Country doesn't Deleted"
            })
        }
    }


    else if (req.body.State_Name && req.body.Country_Name1) {
        let viewdata = await statemodel.deleteOne({ _id: req.body._id })
        if (viewdata.deletedCount == 1) {
            res.send({
                Status: 1,
                Message: "State Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "State doesn't Deleted"
            })
        }
    }


    else if (req.body.District_Name && req.body.Country_Name2 && req.body.State_Name1 && req.body.District_Status) {
        let viewdata = await districtmodel.deleteOne({ _id: req.body._id })
        if (viewdata.deletedCount == 1) {
            res.send({
                Status: 1,
                Message: "District Deleted Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "District doesn't Deleted"
            })
        }
    }

    else {
        res.send({
            Status: 0,
            Message: "Data Missing"
        })
    }

}



// regions controller 

exports.addeducation = async (req, res) => {
    let data = {
        Education_Name: req.body.Education_Name,
        Status: req.body.Status
    }
    let insertdata = await educationmodel(data)
    insertdata.save(data)
        .then(() => {
            res.send({
                Status: 1,
                Message: "Education Added Successfully"
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


exports.vieweducation = async (req, res) => {
    let viewdata = await educationmodel.find();
    res.send(viewdata)
}

exports.viewactiveeducation = async (req, res) => {
    let viewdata = await educationmodel.find({ Status: 'Active' });
    res.send(viewdata)
}



exports.updateducation = async (req, res) => {
    let data = {
        _id: req.body._id,
        Education_Name: req.body.Education_Name,
        Status: req.body.Status
    }


    if (req.body.Education_Name != '' && req.body.Status == 'Active' || req.body.Status == 'De-Active') {
        let updatedata = await educationmodel.updateOne({ _id: data._id }, { Education_Name: data.Education_Name, Status: data.Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn,t Updated"
        })
    }
}


exports.deleteeducation = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await educationmodel.deleteOne({ _id: data._id })
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



// occupation controllers 

exports.addoccupation = async (req, res) => {
    let data = {
        Occupation_Name: req.body.Occupation_Name,
        Status: req.body.Status
    }
    let insertdata = await occupationmodel(data)
    insertdata.save(data)
        .then(() => {
            res.send({
                Status: 1,
                Message: "Occupation Added Successfully"
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


exports.viewoccupation = async (req, res) => {
    let viewdata = await occupationmodel.find();
    res.send(viewdata)
}




exports.viewactiveoccupation = async (req, res) => {
    let viewdata = await occupationmodel.find({ Status: 'Active' });
    res.send(viewdata)
}


exports.updateoccupation = async (req, res) => {
    let data = {
        _id: req.body._id,
        Occupation_Name: req.body.Occupation_Name,
        Status: req.body.Status
    }


    if (req.body.Occupation_Name != '' && req.body.Status == 'Active' || req.body.Status == 'De-Active') {
        let updatedata = await occupationmodel.updateOne({ _id: data._id }, { Occupation_Name: data.Occupation_Name, Status: data.Status })
        if (updatedata.modifiedCount === 1) {
            res.send({
                Status: 1,
                Message: "Data Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Data Doesn,t Updated"
            })
        }
    }
    else {
        res.send({
            Status: 0,
            Message: "Data Doesn,t Updated"
        })
    }
}


exports.deleteoccupation = async (req, res) => {
    let data = {
        _id: req.body._id
    }

    let deletedata = await occupationmodel.deleteOne({ _id: data._id })
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




//theme controller 

exports.addwebsitetheme = async (req, res) => {
    let data = {
        WebsiteBackground: req.body.WebsiteBackground,
        Text_color: req.body.Text_color,
        Btn_Color1: req.body.Btn_Color1,
        Btn_Color2: req.body.Btn_Color2,
        Icons_Filter: req.body.Icons_Filter
    }

    let viewdata = await websitethememodel.find()
    if (viewdata.length === 0) {
        let insertdata = await websitethememodel(data)
        insertdata.save()
            .then(() => {
                res.send({
                    Status: 1,
                    Message: "Theme Added Successfully"
                })
            })
            .catch((error) => {
                if (error.code === 11000) {
                    res.send({
                        Status: 0,
                        Message: "Theme Already Exists"
                    })
                }
                else {
                    res.send({
                        Status: 0,
                        Message: "Theme Already Exists"
                    })
                }
            })
    }
    else {
        let updatedata = await websitethememodel.updateOne({ _id: viewdata[0]._id }, {
            WebsiteBackground: data.WebsiteBackground,
            Text_color: data.Text_color,
            Btn_Color1: data.Btn_Color1,
            Btn_Color2: data.Btn_Color2,
            Icons_Filter: data.Icons_Filter
        })
        if (updatedata.modifiedCount == 1) {
            res.send({
                Status: 1,
                Message: "Theme Updated Successfully"
            })
        }
        else {
            res.send({
                Status: 0,
                Message: "Theme Doesn't Updated"
            })
        }
    }

}


exports.viewwebsitetheme = async (req, res) => {
    let viewdata = await websitethememodel.find()
    if (viewdata.length !== 0) {
        res.send(viewdata)
    }
    else {
        res.send([{
            WebsiteBackground: "#ffd9dc",
            Text_color: "#FFFFFF",
            Btn_Color1: "#e42141",
            Btn_Color2: "#ff5874"
        }])
    }
}