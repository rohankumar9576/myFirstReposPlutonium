
const mid1= function ( req, res, next) {
    let validHadder=req.headers["isfreeappuser"]
if(!validHadder){
    res.send({status:false,msg:"this is mendatory header"})
}
else{
    if(validHadder==="true"){
        req.body.isFreeAppUser=true
    }
    else if(validHadder==="false"){
        req.body.isFreeAppUser=false
    }
    next() 
}

    
}
module.exports.mid1=mid1
