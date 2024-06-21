const cloudinary = require("../cloudinary/cloudinary");
const galleryModel = require("../Model/galleryModel");

const LatestNewsModel=require("../Model/LatestNewsModel")

const updateNews=async(req,res)=>{
    const{NewsImage,News}=req.body;
    try{
        if(NewsImage){
            const uploadRes=await cloudinary.uploader.upload(NewsImage,{
                upload_preset:"VWIB_org"
            })
            if (uploadRes){
                const LatestNews =new LatestNewsModel({
                    NewsImage:uploadRes,
                    News,
                })
                const saveNews = await LatestNews.save();
                return res.status(200).json(saveNews)
            }
        }
    }catch(error){
        console.log(error)
    return res.status(500).json(error)
    }
}

const getNews=async(req,res)=>{
    try{
        const News =await LatestNewsModel.find();
        return res.status(200).json(News)

    }catch(error){
        console.log(error)
    return res.status(500).json(error)
    }
}

const deleteNews =async(req,res)=>{
    const newsId = req.params.newsId;
 try{
    const news = await LatestNewsModel.findById(newsId)
    if(!news){
        return res.status(400).json({message : "news not found"})

    }
    await LatestNewsModel.findByIdAndDelete(newsId)
    return res.status(200).json({message:"news deleted successfully"})

 }catch(error){
        console.log(error)
    return res.status(500).json(error)
    }   
}

module.exports={updateNews,getNews,deleteNews}