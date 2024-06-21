const cloudinary=require('../cloudinary/cloudinary');

const galleryModel=require('../Model/galleryModel');

const addImage=async(req,res)=>{
    const {VWIBImage}=req.body

    try{
        if(VWIBImage){
            const uploadRes=await cloudinary.uploader.upload(VWIBImage,{

                upload_present:"VWIB_org"
            })
            if (uploadRes){
                const Img = new galleryModel({
                    VWIBImage:uploadRes
                })
                const saveImg = await Img.save();
                return res.status(200).json(saveImg)
            }
        }
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

const getImg=async(req,res)=>{
    try{
        const Imgs = await galleryModel.find();
        return res.status(200).json(Imgs)

    }catch(error){
        return res.status(500).json(error)
    }
}
const deleteImg = async (req, res) => {
    const ImageId = req.params.ImageId;
    try {
        const Image = await galleryModel.findById(ImageId);
        if (!Image) {
            return res.status(404).json({ message: "Image not found" });
        }
        await galleryModel.findByIdAndDelete(ImageId);
        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json(error);
    }
};

module.exports={addImage,getImg,deleteImg}
