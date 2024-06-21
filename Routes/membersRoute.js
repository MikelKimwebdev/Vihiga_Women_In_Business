const express = require ("express")

const router = express.Router();

const {registerMember,findMembers} =require ("../Controllers/memberController")

router.post("/register",registerMember)
router.get("/",findMembers)

module.exports= router;