
let date_ob = new Date();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
// console.log(cuurentDate);
function printDate(){
    console.log("date=",date)
}

function printMonth(){
    console.log("month=" ,month)
}
 function getBatchInfo(){
    console.log(" plutonium, W3D4, the topic for today is Nodejs module system")
 }

module.exports.printDate = printDate
module.exports.printMonth=printMonth
module.exports.getBatchInfo=getBatchInfo