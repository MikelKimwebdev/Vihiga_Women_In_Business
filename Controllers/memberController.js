const express = require("express")
const validator = require ("validator")
const membersModel = require("../Model/MembersModel")


const registerMember = async(req,res)=>{
    try{
        const{FirstName,LastName,email,Phone_number,city,membership_Type}=req.body
        let member = await membersModel.findOne({email})
        if(member)
            return res.status(400).json("member already exists")
        if(!FirstName || !LastName || !email || !Phone_number || !city || !membership_Type)
            return res.status(400).json("all fields are required")
        if(!validator.isEmail(email))
            return res.status(400).json("Enter valid email")

        member = new membersModel({FirstName,LastName,email,Phone_number,city,membership_Type})

        const savedMembers= await member.save();
        return res.status(200).json(savedMembers)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

const findMembers=async(req,res)=>{
try{
    const Members= await membersModel.find();
    return res.status(200).json(Members)

}catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports={registerMember,findMembers}