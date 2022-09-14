const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

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


const getCollegeDetails = async function (req, res) {
    try{
    let collegeName = req.query.collegeName

    let collegeInterns = await collegeModel.findOne({ name: collegeName })
    const { name, fullName, logoLink } = collegeInterns

    let internStudents = await internModel.find({ collegeId: collegeInterns._id })
    console.log(internStudents)

    let studentDeatails = internStudents.map(student => {
        return {
            id: student._id.toString(),
            name: student.name,
            mobile: student.mobile,
            email: student.email
        }
    })
    let collegeDetails = {
        name: name,
        fullName: fullName,
        logoLink: logoLink,
        interns: studentDeatails
    }
    console.log(collegeDetails)

    res.status(200).send( { status:true,data:collegeDetails})
}
catch(err){
    res.status(500).send({status:false, msg:err.message})
}

}



module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails