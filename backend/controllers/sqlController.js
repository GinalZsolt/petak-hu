const Router = require('express').Router();
const pool = require('../config').pool;

Router.patch('/:tablename/:id', (req,res)=>{
    let update = "";
    let keys = Object.values(req.body);
    let values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        update +=`${keys[i]}='${values[i]}'`;
    }
    pool.query(`update ${req.params.tablename} set ${update} where ID=${req.params.id}`, (err,data)=>{
        if (err) res.status(500).send(err.message);
        else res.status(200).send(data);
    });
})



module.exports = Router;