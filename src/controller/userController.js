const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");

  //____________________valid password____________________//

const isValidPassword = function (password) {
    password = password.trim();
    if (password.length < 8 || password.length > 15) {
      return false;
    }
    return true;
  };
  

  const isVAlidEmail = function (email) {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
  };

const isvalidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};


//____________________validation  end _____________________//



const createAdmin= async function(req,res){
  try{
  const requestBody = req.body;
  if (!isvalidRequestBody(requestBody)) {
    res.status(400).send({
      status: false,
      message: "Request body can't be empty",
    });
    return;
  }
  let { email, password } = requestBody;
  //validation start
  
  if (!isVAlidEmail(email)) {
    res.status(400).send({ status: false, message: "Email is required" });
    return;
  }
  if (!isValidPassword(password)) {
    res.status(400).send({ status: false, message: "Password is required" });
    return;
  }
  
  const isEmailAlreadyUsed = await userModel.findOne({ email });
  if (isEmailAlreadyUsed) {
    res.status(400).send({
      status: false,
      message: `${email} Email is already registered`,
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const adminData = { email, password};
  const newAdmin = await userModel.create(adminData);
  res.status(201).send({
    status: true,
    message: `Admin data created sucessfully`,
    data: newAdmin,
  });
} catch (err) {
  res.status(500).send({ status: false, msg: err.message });
}
}


//_________________loging______________________//


const userLogin = async function (req, res) {
     try {
      let requestBody = req.body;
      if (Object.keys(requestBody).length === 0)
        return res
          .status(400)
          .send({ status: false, error: "Body can't be empty" });
  
      let { email, password } = requestBody;
  
      if (!isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email is required !!" });
      }
  
      if (!isVAlidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid email" });
      }
  
      if (!isValid(password)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid password !!" });
      }
  
      if (!isValidPassword(password)) {
        return res.status(400).send({
          staus: false,
          message: "Length of the password must be between 8 to 15 charaxters",
        });
      }
  
      let findPassword = await userModel.findOne({ email: email });
      console.log(findPassword);
      let passwordData = await bcrypt.compare(password, findPassword.password);
      if (!passwordData) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid credentials" });
      }
  
      let userid = await userModel.findOne({
        email: email,
        password: findPassword.password,
      });
  
      // creating Token
      let token = jwt.sign(
        {
          userId: userid._id,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        "project-6"
      );
      let obj = {
        userId: userid._id,
        token: token,
      };
  
      return res
        .status(200)
        .send({ status: true, message: "User login successfull", data: obj });
    }
      catch (err) {
       res.status(500).send({ status: false, error: err.message });
     }
   };
  
module.exports={userLogin,createAdmin}
