const Router = require('express').Router();
var mysql = require('mysql');
var pool = mysql.createPool();

//select all sql
Router.get('/:table', (req, res)=>{
    let table_name=req.params.table;
    pool.
})
