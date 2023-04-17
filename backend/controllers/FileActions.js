let tCheck = require('../modules/tokenCheck');
let log =require('../modules/logging').log;
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
const fs = require('fs');
const path = require('path')
const router=require('express').Router()

router.post('/single', tCheck.tokenCheck(), function (req, res) {
  multer.single('image')(req,res,(err)=>{
    if (err) res.status(500).send(err);
    else{
      log(req.socket.remoteAddress, `${req.file.filename} uploaded`)
      res.status(200).json(req.file);
    } 
  });
})

router.post('/multiple', tCheck.tokenCheck() ,function (req, res) {
  multer.fields([
    {name:"head"},
    {name:"tail"}
  ])(req,res,(err)=>{
    if (err) res.status(500).send(err);
    else{
      //log(req.socket.remoteAddress, `${req.files.map(e=>e.filename).join(",")} files uploaded`)
      res.status(200).json(req.files);
    } 
  })
})

router.delete('/single/:name', tCheck.tokenCheck(), (req,res)=>{
  if (fs.existsSync(path.join(__dirname, `../uploads/${req.params.name}`))){
    fs.rm(path.join(__dirname, `../uploads/${req.params.name}`), ()=>{
      log(req.socket.remoteAddress, `${req.params.name} file deleted`)
      res.status(200).json(
        {message: "sikeres törlés!", error: false}
      );
    });
  }
  else{
    log(req.socket.remoteAddress, `tried to delete a file`)
    res.status(400).json({message:"sikertelen törlés!", error: true});
  }
});

module.exports={multer,router};