const express = require('express');
const _=require("underscore")
const dash=require("lodash")

// const myun=require("union")
const abc = require('../introduction/intro');
const { application } = require('express');
const router = express.Router();


router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!') 

          // Question no. 4    month name
    let arr=["jan","feb","march","apr","may","june","july","aug","sep","oct","nov","dec"]
    const resultArr=_.chunk(  arr,3) 
    console.log(  "month name",resultArr)



       let oddNUM=[1,3,5,7,9,11,13,15,17,19]
       const tailarr=_.tail(oddNUM)
       console.log(tailarr)
          

       // next problem

    let arr1=[1,2,3,4];
    let arr2=[4,2,6,5];
    let arr3=[8,7,9,10];
    let arr4=[8,14,12,13]
    const unresult=_.union(arr1,arr2,arr3,arr4)
    console.log("union of number",unresult)
    
    //   problem 5

    let pairarr=[

        ['name', 'Rohan'], 
        ['live', 'Bihar'], 
        ['used', 'FunctionUp']

    ]
   
const pairResult=dash.fromPairs(pairarr)
console.log(pairResult)
  

});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){


})


router.get('/sol1', function (req, res) {
let arr=[1,2,3,5,6,7]
let total=0;
for (let i=0;i<arr.length;i++) {
    total += arr[i];
}
let n=arr.pop()
let sumOfNum=(n*(n+1))/2

let missingNum =sumOfNum-total
console.log(missingNum)
res.send({missingNum})
})






router.get('/sol2' ,function(req,res){
let arr=[33,34,35,37,38]


let total=0;
for (let i=0;i<arr.length;i++) {
    total += arr[i];
}
let n=32
let sumOfNum=(n*(n+1))/2
let n2=arr.pop()
let anoSum =(n2*(n2+1))/2
let missingNum = anoSum-sumOfNum-total
res.send({missingNum})
})

router.post('/mypost' ,function(req,res){
    let postreq=req.body
    res.send(postreq)
    

})

let players=[{
    "name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": ["swimming"]
},
    
   { "name": "gopal",
    "dob": "1/09/1995",
    "gender": "male",
    "city": "delhi",
    "sports": ["soccer"]
},
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports":["soccer"]
    },

]

router.post('/players', function (req, res) {

let reqPlayer=req.body
let isflagRepeat=false;
for(let i=0;i<players.length;i++){
    if(reqPlayer.name==players[i].name){
        isflagRepeat=true;
        break;
    }
}

if(isflagRepeat){
    res.send("Already exist")
}
 else{
    players.push(reqPlayer)
    res.send(players)
 }


})


let persons = [

    {
        nane: "PK",

        age: 10, votingStatus: false
    },

    {
        nane: "SK",

        age: 20,

        votingStatus: false
    },

    {
        nane: "AA", age: 70,

        votingStatus: false
    },

    {
        nane: "SC",

        age: 5, votingStatus: false
    },

    {
        name: "HO",

        age: 40,

        votingStatus: false
    }
]

router.post('/voters/:votingAge',function(req,res){
    let ageReq=req.params.votingAge

    for(let i=0;i<persons.length;i++){
        persons[i]
        if(persons[i].age>=ageReq){
             persons[i].votingStatus="true"    
        } 
    }
 res.send(persons)
})


module.exports = router;

// adding this comment for no reason



