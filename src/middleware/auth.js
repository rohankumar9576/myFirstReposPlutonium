const userController = require("../controllers/userController")
const jwt = require("jsonwebtoken");



const authenticate = function (req, res, next) {
  try {
    //check the token in request header
    //validate this token
    let token = req.headers["x-auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) return res.send({ status: false, msg: "token is invalid" })
    req["decodedToken"] = decodedToken
    next()
  }
  catch (err) {
    console.log("rohan dekh lo:", err.message)
    res.send({ msg: err.message })
  }
}


const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  try {
   
    let userToBeModified = req.params.userId
    let userLoggedIn = req.decodedToken.userId
    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
  }
  catch (error) {
    console.log("your mistake is :", error.message)
    res.send({ status: false, errors: error.message })
  }
}
module.exports.authenticate = authenticate
module.exports.authorise = authorise