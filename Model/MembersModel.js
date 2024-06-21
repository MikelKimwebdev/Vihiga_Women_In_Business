
const mongoose = require ("mongoose")

const memberSchema= new mongoose.Schema({
    FirstName:{type:String,required:true,minLength:3,maxLength:30},
    LastName:{type:String,required:true,minLength:3,maxLength:30},
    email:{type:String,required:true,minLength:3,maxLength:200},
    Phone_number:{type:String,required:true,minLength:3,maxLength:30},
    city:{type:String,required:true,minLength:3,maxLength:30},
    membership_Type:{type:String,required:true,minLength:3,maxLength:30}
},{
    timestamps:true,
})

const membersModel=mongoose.model("member",memberSchema)

module.exports = membersModel;