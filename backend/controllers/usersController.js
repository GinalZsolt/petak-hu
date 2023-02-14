const Router = require('express').Router();
const pool = require('../config').pool;
const tokenChk = require('../modules/tokenCheck');
const fs = require('fs');
const path = require('path');
let jwt = require('jsonwebtoken');
Router.post('/login', (req, res) => {
    pool.query('select * from users where email=? and passwd=?', [req.body.email, req.body.passwd], (err, data) => {
        if (data.length == 0) res.status(400).json({
            message: 'Rossz bejelentkezési adatok!',
            type: 'danger'
        });
        else {
            pool.query('select * from moderations where userID=?', [data[0].ID], (err, results) => {
                if (err) res.status(500).send(err.message);
                else {
                    if (results.length == 0) {
                        console.log(data[0]);
                        let token = jwt.sign({
                            id: data[0].ID,
                            permission: data[0].permission,
                            username:data[0].name
                        }, process.env.JWTTOKEN, {expiresIn:'7d'});
                        res.status(200).send({
                            message: 'Sikeres login!',
                            token: token
                        });
                    }
                    else res.status(403).json({
                        message: 'Tiltott felhasználó!',
                        type: 'danger'
                    })
                }
            })
        }
    })
})
Router.post('/logout', (req,res)=>{
    let blacklist = [];
    if (req.headers.authorization){
        fs.readFile(path.join(__dirname, '../blacklist.json'), (err, file)=>{
            let userToken = req.headers.authorization.split(' ')[1]
            blacklist = JSON.parse(file);
            if (!blacklist.includes(userToken)){
                blacklist.push(userToken)
            }
            fs.writeFile(path.join(__dirname, '../blacklist.json'), JSON.stringify(blacklist), (err)=>{
                if (err) res.status(500).send(err);
                else res.status(200).send({
                    message:'logout success!'
                });
            })
        });
    }

})
Router.post('/register', (req, res) => {
    pool.query(`insert into users (${Object.keys(req.body).join(', ')}) values (${Object.values(req.body).map(e => "'" + e + "'").join(', ')})`, (err, data) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") res.status(400).send({
                message: 'Használt e-mail cím!',
                type: 'danger'
            })
            else { res.status(500).send(err); }
        }
        else res.status(200).send(data);
    })
})
Router.get('/user-data', (req,res)=>{
    tokenChk.getUser(req,res);
})
module.exports = Router;