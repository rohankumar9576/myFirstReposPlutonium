const { urlencoded } = require("express")
const express=require("express")
//const bodyParser=require("body-parser")
const route =require("./routers/route")
const mongoose=require("mongoose")
const app=express()
//app.use(bodyParser.json())

mongoose.connect("mongodb+srv://bittushri8224:lyNrXnwy17jk4lFa@cluster0.ii3dqef.mongodb.net/group61")

app.use('/',route)
app.listen(process.env.PORT || 3000 ,function(){
    console.log("App is running on 3000")
})