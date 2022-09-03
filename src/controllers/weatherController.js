const axios=require("axios")


const getWeather=async function(req,res){
    let result=await axios.get("http://api.openweathermap.org/data/2.5/weather?q=London&appid=9ab74cff66818d1195403482bd8cd9ec")
       let data=result.data
    res.send({status:true,msg:data})

}

const sortTemp=async function(req,res){
    let city=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let sortedCity=[];
    for(let i=0;i<city.length;i++){
        let obj={City:city[i]}
        console.log(obj)
        let result= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=9ab74cff66818d1195403482bd8cd9ec`)
        console.log(result.data.main.temp)
obj.temp=result.data.main.temp
sortedCity.push(obj)
    }
let sorted=sortedCity.sort(function(a,b){return a.temp-b.temp})
res.status(200).send({msg:true,data:sorted})
}
module.exports.getWeather=getWeather
module.exports.sortTemp=sortTemp