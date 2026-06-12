const express= require("express")
const router=express.Router();
const UserController=require("../controllers/UserController");
const {body}=require("express-validator")
const HandleValidationRequest=require("../validations/HandleValidationRequest")
const Users=require("../models/Users")
router.post("/register",[
    body("name").notEmpty(),
    body("email").custom(async value => {
      const emailExist = await Users.findOne({ email:value });
      if (emailExist) {
        throw new Error("email already exist");
      }    
    }).isEmail().normalizeEmail(),
    body("password").notEmpty()
],HandleValidationRequest,UserController.register) ;

router.post("/login",[
    body("email").isEmail().normalizeEmail().notEmpty(),
    body("password").notEmpty()
],HandleValidationRequest,UserController.login) ;

router.get("/logout",(req,res)=>{
  res.clearCookie("token").json({msg:"logout successfully"})
});

module.exports=router;