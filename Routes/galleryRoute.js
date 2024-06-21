const express= require("express")

const router=express.Router()

const {addImage,getImg,deleteImg}=require ('../Controllers/galleryController')

router.post('/upload_image',addImage);
router.get('/images',getImg)
router.delete("/images/:ImageId",deleteImg)

module.exports=router;