const UserModel=require("./userSchema")
const jwt=require("jsonwebtoken")

 const createUser=async function (req,res){
    let data=req.body
    let saveData= await UserModel.create(data)
    res.status(201).send({status:true,data:saveData})
 }
 
 const loginUser= async function(req,res){
    let email=req.body.email;
    let password=req.body.password;

    let checkData= await UserModel.findOne({email:email})
    if(!checkData){
        return res.send({status:false,message:"email not found"})
    }
    

let createToken=jwt.sign(
    {userId:checkData._id.toString(),
        org:"Metapercept"}, 
        " secret-key-Rohan")

        res.send({status:true,data:createToken})
      

 }
 module.exports={createUser,loginUser}