const express=require("express")
const router=express.Router();
const userController=require("../userController")

router.post("/createUser",userController.createUser)
router.post("/user/login",userController.loginUser)


module.export=router;