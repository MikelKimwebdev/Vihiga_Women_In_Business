const express=require("express")
const adminModel=require("../Model/adminModel");
const bcrypt=require("bcrypt");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const crypto = require("crypto");
const { sendVerificationEmail } = require("../Transporter/sendVerificationEmail");

const createToken=(_id)=>{
    const jwtKey=process.env.JWT_SECRET_KEY;
    return jwt.sign({_id},jwtKey,{expiresIn:"3d"})
}

const Register=async(req,res)=>{
    try{
        const{userName,email,password,confirm_password}=req.body;
        let admin=await adminModel.findOne({email})
        if (admin)
            return res.status(400).json("Admin already exists")
        if(!userName||!email||!password||!confirm_password)
            return res.status(400).json("All fields requires")
        if(!validator.isEmail(email))
            return res.status(400).json("enter valid email")
        if(!validator.isStrongPassword(password))
            return res.status(400).json("Please enter strong Password")
        if(password !== confirm_password){
            return res.status(400).json("password is incorrect")
        }
        admin=new adminModel({userName,email,password,confirm_password,emailToken:crypto.randomBytes(64).toString("hex")})

        const salt =await bcrypt.genSalt(10);

        admin.password=await bcrypt.hash(admin.password,salt)
        admin.confirm_password=await bcrypt.hash(admin.confirm_password,salt)

        await admin.save();

        sendVerificationEmail(admin);

         const token =createToken(admin._id)
        res.status(200).json({_id:admin,userName,email,password,confirm_password,token})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"error occurred in the server"})
    }
}
const loginAdmin=async(req,res)=>{
    const {email,Password}=req.body;
    try{
        let admin =await adminModel.findOne({email})
        if(!admin)
            return res.status(400).json("email does not exist")
        const isValidPassword=await bcrypt.compare(Password,admin.password)
        if (!admin.isVerified)
            return res.status(400).json("Email is not verified");
        if(!isValidPassword)
            return res.status(400).json("Password does not match")
        const token=createToken(admin._id);
        res.status(200).json({_id:admin._id,email,Password,token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"error occurred in the server"})
    }
}

const FindAdmin=async(req,res)=>{
    const adminId=req.params.adminId;
    try{
        const admin=await adminModel.findById(adminId)
        res.status(200).json(admin)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"error occured in the server"})
    }
}
const FindAllAdmin=async(req,res)=>{
    try{
        const admins=await adminModel.find();
        res.status(200).json(admins)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"error occured in the server"})
    }
}

const verifyEmail=async(req,res)=>{
    try{
        const emailToken =req.body.emailToken;
        if(!emailToken){
            return res.status(400).json("EmailToken not found")
        }

        const admin = await adminModel.findOne({emailToken});
        if(admin){
            admin.emailToken=null;
            admin.isVerified=true;

            await admin.save();

            const token = createToken (admin._id);

            res.status(200).json({
                _id:admin._id,
                userName:admin.userName,
                email:admin.email,
                token,
                isVerified: admin?.isVerified,
            })
        }else{
            res.status(400).json("Email verification failed,invalid token")
        }

    }catch(error){
        console.log(error)
        res.status(500).json({error:"error occurred in the server"})
    }
}

module.exports={Register,loginAdmin,FindAdmin,FindAllAdmin,verifyEmail}