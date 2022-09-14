const internModel = require("../models/internModel")
const collegeModel=require("../models/collegeModel")

const createIntern = async function (req, res) {
    try{
    let data = req.body;
    let collegeName=data.collegeName
    let collegeId=await collegeModel.find({name:collegeName})
    //console.log(collegeId)
    let id=collegeId.filter(x=>x._id.toString())
    console.log(id)
 //   let saveData = await internModel.create(data)
    res.status(201).send({ status: true ,data:saveData})}
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}


module.exports.createIntern = createIntern