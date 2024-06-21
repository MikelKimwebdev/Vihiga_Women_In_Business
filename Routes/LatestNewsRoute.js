const express=require("express")

const router=express.Router();

const {updateNews,getNews,deleteNews} = require("../Controllers/LatestNewsController")

router.post("/update_news",updateNews);
router.get("/get_news",getNews);
router.delete("/news/:newsId",deleteNews)

module.exports= router;