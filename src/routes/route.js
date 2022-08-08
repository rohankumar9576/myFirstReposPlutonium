const express = require('express');
const _=require("underscore")
const dash=require("lodash")

// const myun=require("union")
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
    let arr=["jan","feb","march","apr","may","june","july","aug","sep","oct","nov","dec"]
    const resultArr=_.chunk(  arr,3) 
    console.log(  "month name",resultArr)
    let arr1=[1,2,3,4];
    let arr2=[4,2,6,5];
    let arr3=[8,7,9,10];
    let arr4=[8,14,12,13]

    const unresult=_.union(arr1,arr2,arr3,arr4)
    console.log("union of number",unresult)
    
    let pairarr=[

        ['name', 'Rohan'], 
        ['live', 'Bihar'], 
        ['used', 'FunctionUp']

    ]
    
const pairResult=dash.fromPairs(pairarr)
console.log(pairResult)
 let dubarr=[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,,17]
    

});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
