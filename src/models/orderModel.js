const mongoose=require("mongoose")
objId=mongoose.Schema.Types.ObjectId

const orderSchema=new mongoose.Schema({
userId:{
    type:objId,
    ref:"user4"
},
productId:{
    type:objId,
    ref:"product"
},
amount:Number,
isFreeAppUser:{
    type:Boolean,
    default:false
},
date:String

},{timestamps:true})

module.exports=mongoose.model("order",orderSchema)