const multer = require('multer')({storage:require('multer').diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        let filename=file.originalname.split('.')[0]+Date.now()+path.extname(file.originalname)
        cb(null,filename)
    }
})});

const path = require('path')
const router=require('express').Router()

router.post('/single', multer.single('image'), function (req, res, next) {
   
})

router.post('/multiple', multer.fields([
    {name:"head"},
    {name:"tail"}
]), function (req, res, next) {
   
})

module.exports={multer,router};