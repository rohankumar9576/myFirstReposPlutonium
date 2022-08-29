const userModel= require("../models/userModel")
const jwt=require("jsonwebtoken")
let authMiddleware= async function(req,res,next){
   
  let token=req.headers["x-auth-token"]
  if(!token) return  res.send({msg:"token not present"}) 
    next()
}
module.exports.authMiddleware=authMiddleware