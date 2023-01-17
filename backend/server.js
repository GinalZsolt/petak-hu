const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);

app.use('/api', require('./controllers/sqlController'))


server.listen(process.env.PORT, () => {
  console.log('http://localhost:8080')
});