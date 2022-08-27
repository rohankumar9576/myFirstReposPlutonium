const userModel = require("../models/userModel")


const createUser=async function(req,res){
    let data=req.body
    let saveData=await userModel.create(data)
    res.send({msg:saveData})
}


module.exports.createUser=createUser