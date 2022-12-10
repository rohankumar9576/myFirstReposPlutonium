const studentModel= require('../models/studentModel')

//__________________validations____________________//
const isvalidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };

  const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };

  const isVAlidNumber = function (Number) {
    return /^[0-9]+$/.test(Number);
  };

//____________________validation  end _____________________//
const createStudent= async function(req,res){
    try{

    const requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Request body cant't be empty",
      });
      return;
    }
    const { name, subject, marks, user } = requestBody;
    //validation start
    if (!isValid(name)) {
      res
        .status(400)
        .send({ status: false, message: "First name is required" });
      return;
    }
    if (!isVAlidNumber(marks)) {
      res.status(400).send({ status: false, message: "Marks should only contain numbers" });
      return;
    }

    const studentData = { name, subject, marks, user };
    const newStudent = await studentModel.create(studentData);
    res.status(201).send({
      status: true,
      message: `Student data created sucessfully`,
      data: newStudent,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}


//__________________get student_________________//
const getStudent = async (req, res) => {
    try {
      const { name, subject } =req.query;
      const filter = {isDeleted : false};
      if (name) {
        filter.name =name;
      }
      if (subject) {
        filter.subject = subject;
      }
      let fetchData = await studentModel.find(filter)
      if(fetchData.length==0){
        return res.status(404).send({status:false, error:"Student data not found"})
      }
      res
        .status(200)
        .send({ status: true, message: "Success", data: fetchData });
    } catch (error) {
      res.status(500).send({ status: false, error: error.message });
    }
  };

//__________________update Marks_________________//


const updateStudent = async function (req, res) {
  try {
    let user= req.params.userId
    let {name, subject, marks} = req.body;
    let deleteCheck = await studentModel.findOne({
      name:name,
      isDeleted: false,
    });
    if (!deleteCheck) {
      return res
        .status(404)
        .send({ status: false, message: "Student does not exist" });
    }
    if(user !== req.loginUserId){
      return res.status(403).send({status:false,message:"Unauthorized user"})
    }
    let updatedData = await studentModel.findOneAndUpdate(
      { name:name,subject:subject },
      { $inc:{marks:marks}},
      { new: true }
    );
    if(!updatedData){
      return res
      .status(404)
      .send({ status: false, message: "Wrong Info Entered" });
    }
    res.status(200).send({ status: true, data: updatedData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


//_____________________Delete student by params________________//

const deleteByUserID = async (req, res) => {
    try {
      let requestParams = req.params.studentId;
      let user= req.params.userId
      if(user !== req.loginUserId){
        return res.status(403).send({status:false,message:"Unauthorized user"})
      }
      let findData = await studentModel.findById(requestParams);
      if (findData) {
        if (findData.isDeleted == false) {
          let changeStatus = await studentModel.findOneAndUpdate(
            { _id: requestParams },
            { $set: { isDeleted: true } },
            { new: true }
          );
          return res.status(200).send({
            status: true,
            msg: "Data deleted successfully"
          });
        } else {
          return res
            .status(404)
            .send({ status: false, msg: "No such data found" });
        }
      }
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  };


module.exports = {createStudent, getStudent, updateStudent, deleteByUserID};