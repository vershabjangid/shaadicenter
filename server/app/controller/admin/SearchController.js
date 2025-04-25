const createprofilemodel = require("../../model/web/CreateProfileModel")
const familyinfomodel = require("../../model/web/FamilyModel")
const professionalmodel = require("../../model/web/ProfessionalModel")
const registersmodel = require("../../model/web/RegisterModel")
const residentialmodel = require("../../model/web/Residentialinfo")

// users controller 
exports.viewusers = async (req, res) => {
    try {

        var viewregister = await registersmodel.find({ Permitted: "Accepted" }).select(["-Password", "-OTP_Value","-Permitted", "-Expires_At", "-Is_verified", "-Email", "-Phone_No", "-Form_Status","-createdAt","-updatedAt"])
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
            imgurl: "https://api.shaadicenter.org/uploads/",
        })


        console.log({
            viewregister,
            profiledata,
            professionaldata,
            residentialdata,
            familydata,
            imgurl: "https://api.shaadicenter.org/uploads/",
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
