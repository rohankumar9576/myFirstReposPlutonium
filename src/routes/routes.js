const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const studentController = require('../controller/studentController')
const middleware = require('../middleware/auth')

//logIn API
router.post("/login",userController.userLogin);
router.post("/admin",userController.createAdmin);

//student register
router.post('/student',studentController.createStudent)
router.get('/getStudent',studentController.getStudent)
router.put('/updateStudent/:userId',middleware.authenticate,studentController.updateStudent)
router.delete('/deleteStudent/:userId/:studentId',middleware.authenticate,studentController.deleteByUserID)


module.exports = router;