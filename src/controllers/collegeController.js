const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const valid = require('../controllers/internController')

//________________________College Create__________________________________________________________________________________________________________________

const createCollege = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        let dataLen = Object.keys(data).length
        if (dataLen == 0) return res.status(400).send({ status: false, msg: "Enter College Details" })

        if (!name) return res.status(400).send({ status: false, msg: "Enter Name,This Is Required" })
        if (!(/^[a-z A-Z]+$/).test(name))
            return res.status(400).send({ status: false, message: "Name should be in Alphabet format" });

        let college = await collegeModel.findOne({ name: name })
        if (college) return res.status(400).send({ status: false, msg: "This college Name Already Exist" })

        if (!fullName) return res.status(400).send({ status: false, msg: "Enter fullName,This is required" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "Enter LogoLink" })
        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).test(logoLink))
            return res.status(400).send({ status: false, message: "Enter Valid  LogoLink" })

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
        if (!(/^[a-z A-Z]+$/).test(collegeName))
            return res.status(400).send({ status: false, message: "Name should be in Alphabet format" });

        let collegeInterns = await collegeModel.findOne({ name: collegeName })
        if (!collegeInterns) return res.status(400).send({ status: false, msg: "This College does't exist" })

        const { name, fullName, logoLink } = collegeInterns

        let internStudents = await internModel.find({ collegeId: collegeInterns._id }).select({ _id: 1, name: 1, mobile: 1, email: 1 })
        if (!internStudents) return res.status(404).send({ status: false, msg: "No such Interns Are There" })

        let collegeDetails = { name, fullName, logoLink, interns: internStudents }
        console.log(collegeDetails)

        res.status(200).send({ status: true, data: collegeDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports = { createCollege, getCollegeDetails }  