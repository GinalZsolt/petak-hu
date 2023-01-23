const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', require('./controllers/sqlController'))
app.use('/api/users', require('./controllers/usersController'))
server.listen(process.env.PORT, () => {
  console.log('http://localhost:8080')
});