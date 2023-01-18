const Router = require('express').Router();
const pool = require('../config').pool;

Router.post('/login', (req,res)=>{
    pool.query('select * from users where email=? and passwd=?', [req.body.email, req.body.passwd], (err,data)=>{
        if (data.length==0) res.status(400).json({
            message: 'Rossz bejelentkezési adatok!',
            type:'danger'
        });
        pool.query('select * from moderations where userID=?', [data[0].ID], (err, results)=>{
            if (err) res.status(500).send(err.message);
            else {
                if (results.length==0) res.status(200).json({
                    message:'Sikeres login!',
                    userData: data[0]
                });
                else res.status(403).json({
                    message:'Tiltott felhasználó!',
                    type:'danger'
                })
            }
        })
    })
})




module.exports = Router;