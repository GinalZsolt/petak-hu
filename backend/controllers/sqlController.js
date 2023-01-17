const Router = require('express').Router();
const mysql = require('mysql');
const config = require('../config.js');

//select all sql
Router.get('/:table', (req, res)=>{
    let table_name=req.params.table;
    config.pool.query(`SELECT * FROM ?`, [table_name], (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})
