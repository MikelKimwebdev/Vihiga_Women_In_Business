const mongoose=require("mongoose")

const LatestNewsSchema= new mongoose.Schema({
    NewsImage:{type:Object,required:true},
    News:{type:String,required:true}
})

const LatestNewsModel=mongoose.model("LatestNews",LatestNewsSchema)

module.exports=LatestNewsModel;