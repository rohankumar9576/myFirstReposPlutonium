//const { default: mongoose } = require("mongoose");

const { Schema } = require("mongoose")

const mongoose=require(mongoose)
const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    confirm_password:{type:String},
    verification_status:{type:Boolean}
},{timestamps:true})
module.exports=mongoose.UserModel("myUser",userSchema)
