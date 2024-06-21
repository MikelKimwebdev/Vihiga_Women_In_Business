const mongoose=require("mongoose")

const adminSchema= new mongoose.Schema(
    {
        userName:{type:String,required:true,minLength:3,maxLength:30},
        email:{type:String,required:true,minLength:3,maxLength:30},
        password:{type:String,required:true,minLength:3,maxLength:200,unique:true},
        confirm_password:{type:String,required:true,minLength:3,maxLength:200,unique:true},
        isVerified:{type:Boolean,default:false},
        emailToken:{type:String}
    },
    {
        timestamps:true,
    }
)
const adminModel=mongoose.model("admin",adminSchema)

module.exports=adminModel;