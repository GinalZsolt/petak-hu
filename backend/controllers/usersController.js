const Router = require('express').Router();
const pool = require('../config').pool;

Router.post('/login', (req,res)=>{
    pool.query('select * from users where email=? and passwd=?', [req.body.email, req.body.passwd], (err,data)=>{
        if (data.length==0) res.status(400).json({
            message: 'Rossz bejelentkezési adatok!',
            type:'danger'
        });
        else{
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
        }
    })
})
Router.post('/register', (req,res)=>{
    pool.query(`insert into users (${Object.keys(req.body).join(', ')}) values (${Object.values(req.body).map(e=>"'"+e+"'").join(', ')})`, (err, data)=>{
        if (err){
            if (err.code==="ER_DUP_ENTRY") res.status(400).send({
                message: 'Használt e-mail cím!',
                type:'danger'
            })
            else{res.status(500).send(err);}
        }
        else res.status(200).send(data);
    })
})




module.exports = Router;