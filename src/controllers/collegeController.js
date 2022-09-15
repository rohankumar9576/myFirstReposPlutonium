const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const valid=require('../controllers/internController')

//________________________College Create__________________________________________________________________________________________________________________

const createCollege = async function (req, res) {
    try {
        let data = req.body
        let {name,fullName,logoLink}=data

        let dataLen=Object.keys(data).length
        if(dataLen==0) return res.status(400).send({status:false ,msg:"Enter College Details"})
         
         if(!name) return res.status(400).send({status:false ,msg:"Enter Name"})
         if(!fullName) return res.status(400).send({status:false ,msg:"Enter fullName"})
         if(!logoLink) return res.status(400).send({status:false ,msg:"Enter LogoLink"}) 
         
        let saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: saveData })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

//___________________________Get College Details_____________________________________________________________________________________________________________

const getCollegeDetails = async function (req, res) {
    try {
        let data = req.query
        let dataLen = Object.keys(data).length
        if (dataLen == 0) return res.status(400).send({ status: false, msg: "Enter Data " })

        let collegeName = data.collegeName
        if (!valid.isValid(collegeName)) return res.status(400).send({ status: false, msg: "Enter college Name " })

        let collegeInterns = await collegeModel.findOne({ name: collegeName })
        if (!collegeInterns) return res.status(400).send({ status: false, msg: "This College does't exist" })

        const { name, fullName, logoLink } = collegeInterns

        let internStudents = await internModel.find({ collegeId: collegeInterns._id }).select({ _id: 1, name: 1, mobile: 1, email: 1 })
        if (!internStudents) return res.status(404).send({ status: false, msg: "No such Interns Are Their" })

        let collegeDetails = { name, fullName, logoLink, interns: internStudents }
        console.log(collegeDetails)

        res.status(200).send({ status: true, data: collegeDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports = { createCollege, getCollegeDetails }  