const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

//________________________College Create__________________________________________________________________________________________________________________

const createCollege = async function (req, res) {
    try {

        let data = req.body
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
        
        let collegeName = req.query.collegeName
       
        let collegeInterns = await collegeModel.findOne({ name: collegeName })
        const { name, fullName, logoLink } = collegeInterns

        let internStudents = await internModel.find({ collegeId: collegeInterns._id }).select({ _id: 1, name: 1, mobile: 1, email: 1 })
        console.log(internStudents)
 
        let collegeDetails = { name, fullName, logoLink, interns: internStudents }
        console.log(collegeDetails)

        res.status(200).send({ status: true, data: collegeDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



module.exports={ createCollege ,  getCollegeDetails }  