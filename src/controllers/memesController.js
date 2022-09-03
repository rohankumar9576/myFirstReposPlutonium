const axios=require("axios")

const memes=async function(req,res){
    try
    {let options=await axios.get("https://api.imgflip.com/get_memes")
    let data=options.data
    res.status(200).send({msg:data})
}
catch(err){console.log(err.message)
res.status(500).send({msg:err.message})}
}

const createMemes=async function(req,res){
    try
    { let template_id=req.query.template_id
        console.log(template_id)
        let text0=req.query.text0
        let text1=req.query.text1
        // let username=req.params.username
        // let password=req.params.password
        let options={
            method:"post",
           
           url:`http://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`

            // url:`https://api.imgflip.com/get_memes?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        }
        let result =await axios(options)
        console.log(result)
    
    res.status(200).send({msg:result.data})
}
catch(err){console.log(err.message)
res.status(500).send({msg:err.message})}
}
   

module.exports.memes=memes
module.exports.createMemes=createMemes