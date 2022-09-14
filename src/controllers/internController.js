const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let colleges = await collegeModel.findOne({ name: data.collegeName }, { _id: 1 })

        if (!colleges) {
            return res.status(404).send({ status: false, message: "College id not found" })
        }
        else {
            data.collegeId = colleges._id

            delete data.collegeName
        };

        let saveData = await internModel.create(data)
        res.status(201).send({ status: true, data: data })
        
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createIntern = createIntern