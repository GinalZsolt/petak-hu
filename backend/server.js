require("dotenv").config()

const express = require('express');
const app = express();
const path = require("path")
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const multer= require('./controllers/FileActions').multer


app.use(express.static(path.join(__dirname,"/uploads")))


app.use('/api/file',require('./controllers/FileActions').router)

server.listen(process.env.PORT, () => {
  
});
