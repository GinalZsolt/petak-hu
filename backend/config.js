require('dotenv').config();
const mysql = require('mysql'),
      pool = mysql.createPool({
        host:process.env.DBHOST,
        database:process.env.DBNAME,
        user:process.env.DBUSER,
        password:process.env.DBPASS
    }),
      PORT = process.env.PORT;
module.exports = {
    pool, PORT
}





