require("dotenv").config()

const express = require('express');
const app = express();
const path = require("path")
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const {Server} = require('socket.io');
const multer= require('./controllers/FileActions').multer
const log = require('./logging').log;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/img', express.static(path.join(__dirname,"/uploads")))
app.use('/api/file',require('./controllers/FileActions').router)
app.use('/mail', require('./controllers/mailing'));
const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173",
    methods:["GET", "POST"]
  }
});

app.use('/api', require('./controllers/sqlController'))
app.use('/api/users', require('./controllers/usersController'))
app.use('/mailing', require('./controllers/mailingController'));
server.listen(process.env.PORT, () => {
  log('http://localhost:'+server.address().port, 'server started');
});


io.on('connection', (socket)=>{
  socket.on('roomJoin', (roomDetails)=>{
    socket.join(roomDetails);
    log(socket.handshake.address, `connected to ${roomDetails}.`);
  })
  socket.on('bid', (price, room)=>{
    io.sockets.in(room).emit('newPrice', price);
    log(socket.handshake.address, `bid on ${room}: new price ${price}.`);
  })
  socket.on('disconnect', ()=>{
    socket.rooms.clear();
    log(socket.handshake.address, 'disconnected from the auction system.');
  })
})