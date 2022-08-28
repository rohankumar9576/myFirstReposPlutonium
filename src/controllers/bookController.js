const authorModel = require("../models/authorModel")
const publisherModel=require("../models/publisherModel")
const bookModel= require("../models/bookModel")
const e = require("express")

const createBook= async function (req, res) {

let data=req.body
let authVerify=data.authorId
let pubVerify=data.publisherId
if(!authVerify){
    return res.send({msg:"author is is not present"})
}
else if(!pubVerify){
    return res.send({msg:"publisher id is not present"})
}
let authData=await authorModel.findById(authVerify)
console.log(authData)
let pubData=await publisherModel.findById(pubVerify)
console.log(pubData)

if(!authData){
    res.send({msg:"author id is not valid"})
}
else if(!pubData){
    res.send({msg:"publisher id is not valid"})
}

else{
 let saveData=await bookModel.create(data)
 console.log(saveData)
res.send({msg:saveData})}
}









const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('authorId publisherId')
    res.send({data: specificBook})
}






// const getBookWithPublisherDetails=async function(req,res){
//     let publisherdetails=await bookModel.find({$or:[{name:"penguin"},{name:"HarperCollins"}],_id:1})
// let emptyarr=[]
// for(let i=0;i<publisherdetails.length;i++){
//     emptyarr.push(publisherdetails[i]._id)
// }
// let updateBook=await bookModel.updateMany({publisherId:{$in:emptyarr}},{isHardCover:true},{new:true})
// res.send({msg:updateBook})
// }





module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails


//  module.exports.getBookWithPublisherDetails=getBookWithPublisherDetails

