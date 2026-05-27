const express=require("express");
const {body}=require("express-validator")
const router=express.Router();
const NewController=require("../controllers/NewController")
const HandleValidationRequest=require("../validations/HandleValidationRequest")

router.get("/",NewController.index)
router.post("/",[
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("type").notEmpty()
],HandleValidationRequest,
    NewController.store
);
router.get("/:id",NewController.show)
router.delete("/:id",NewController.delete)
router.put("/:id",[
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("type").notEmpty()
],HandleValidationRequest,
    NewController.update)

module.exports = router;