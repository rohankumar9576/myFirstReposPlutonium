const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true
}


//______________________Interns Create______________________________________________________________________________________________________________________

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let {name,email,mobile,collegeName}=data

        //_________________________________________________validation__________________________________________________________________
       
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "please provide some data" })

        if (!isValid(name))
            return res.status(400).send({ status: false, message: "Name is required" })

        if (!(/^[a-z A-Z]+$/).test(data.name))
            return res.status(400).send({ status: false, message: "Name should be in Alphabet format" });

        if (!isValid(email))
            return res.status(400).send({ status: false, message: "Email is required" })

        if (! (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/).test(email))
            return res.status(400).send({ status: false, message: "Please provide valid email" })

        let usedEmail = await internModel.findOne({ email: email })
        if (usedEmail) return res.status(400).send({ status: false, message: "This email is already used" })

        if (!isValid(mobile))
            return res.status(400).send({ status: false, message: "Please provide Mobile Number" })

        if (!/^\d{10}$/.test(mobile))
            return res.status(400).send({ status: false, message: "Please provide valid Mobile Number" })

        let checkNumber = await internModel.findOne({ mobile: mobile })
        if (checkNumber) return res.status(400).send({ status: false, message: "This mobile number is already used" })

       if(!collegeName) return res.status(400).send({status:false,msg:"Enter College Name"})

       //___________________________________creation part_______________________________________________________________________

        let colleges = await collegeModel.findOne({ name: collegeName }, { _id: 1 })
        if (!colleges) return res.status(404).send({ status: false, message: "College not found" })

        data.collegeId = colleges._id

        let saveData = await internModel.create(data)
        let {collegeId,isDeleted}=saveData

        res.status(201).send({ status: true, data:{isDeleted,name,email,mobile,collegeId}})

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports={createIntern,isValid}
