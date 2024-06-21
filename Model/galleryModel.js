const mongoose = require("mongoose");

const gallerySchema=new mongoose.Schema({
    VWIBImage:{type:Object,required:true}
},{
    timestamps:true
})

const galleryModel=mongoose.model("VWIBImage",gallerySchema)

module.exports= galleryModel;