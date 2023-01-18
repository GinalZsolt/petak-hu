const multer = require('multer')({storage:require('multer').diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        let filename=file.originalname.split('.')[0]+Date.now()+path.extname(file.originalname)
        cb(null,filename)
    }
})});

var mysql = require('mysql')
var pool =require("../config.js").pool

const path = require('path')
const router=require('express').Router()

router.post('/single', multer.single('image'), function (req, res, next) {
  res.json(req.file)
})

router.post('/multiple', multer.fields([
    {name:"head"},
    {name:"tail"}
]), function (req, res, next) {
  res.json(req.files)
})


module.exports={multer,router};