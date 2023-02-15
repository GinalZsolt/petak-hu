let tCheck = require('../modules/tokenCheck');
const multer = require('multer')({
    storage:require('multer').diskStorage({
      destination:"./uploads",
      filename:(req,file,cb)=>{
        let filename=file.originalname.split('.')[0]+Date.now()+path.extname(file.originalname)
        cb(null,filename)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) cb(null, true);
      else cb({
        'message': 'File is not accepted!',
        'name': 'FileAccept Error',
        'code': 'FILE_NOT_ACCEPTED'
      }, false);
    },
    limits:{
      fileSize: 5242880
    }
  });
var mysql = require('mysql')
var pool =require("../config.js").pool

const path = require('path')
const router=require('express').Router()

router.post('/single', tCheck.tokenCheck(), function (req, res) {
  multer.single('image')(req,res,(err)=>{
    if (err) res.status(500).send(err);
    else res.status(200).json(req.file);
  });
})

router.post('/multiple', tCheck.tokenCheck() ,function (req, res) {
  multer.fields([
    {name:"head"},
    {name:"tail"}
  ])(req,res,(err)=>{
    if (err) res.status(500).send(err);
    else res.status(200).json(req.files);
  })
})


module.exports={multer,router};