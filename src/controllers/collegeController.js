const collegeModel=require("../models/collegeModel")

const createCollege=async function(req,res){
    let data=req.body
    let saveData=await collegeModel.create(data)
    res.status(201).send({status:true,data:saveData})
}

module.exports.createCollege=createCollege