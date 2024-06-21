const express=require("express")
const router =express.Router();
const {Register,loginAdmin,FindAdmin,FindAllAdmin,verifyEmail}=require("../Controllers/adminController")

router.post("/register",Register)
router.post("/login",loginAdmin)
router.get("/admin/:adminId",FindAdmin)
router.get("/",FindAllAdmin)
router.post("/verify_email",verifyEmail)

module.exports=router;