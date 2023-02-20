require("dotenv").config()

const express = require('express');
const app = express();
const path = require("path")
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const {Server} = require('socket.io');
const multer= require('./controllers/FileActions').multer

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/img', express.static(path.join(__dirname,"/uploads")))
app.use('/api/file',require('./controllers/FileActions').router)
const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173",
    methods:["GET", "POST"]
  }
});

app.use('/api', require('./controllers/sqlController'))
app.use('/api/users', require('./controllers/usersController'))
server.listen(process.env.PORT, () => {
  console.log('http://localhost:8080')
});


io.on('connection', (socket)=>{
  socket.on('roomJoin', (roomDetails)=>{
    socket.join(roomDetails);
    console.log(`${socket.handshake.address} connected to the auction system`);
  })
  socket.on('bid', (price, room)=>{
    io.sockets.in(room).emit('newPrice', price);
  })
  socket.on('disconnect', ()=>{
    socket.rooms.clear();
    console.log(`${socket.handshake.address} disconnected`);
  })
})