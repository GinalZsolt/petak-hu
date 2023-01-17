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

//select one sql
Router.get('/:table/:field/:value', (req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    config.pool.query(`SELECT * FROM ? WHERE ${field}=${value}`, [table_name, table_field, field_value], (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//insert sql
Router.post('/:table', (req, res)=>{
    let table_name=req.params.table;
    let records=req.body;
    let fields=Object.keys(records);
    let values=Object.values(records);
    let str= null;
    let str2= "id";
    str2 = Object.keys(records).join(', ');
    str = Object.values(records).map(e=> "'"+e+"'").join(', ');
    pool.query(`INSERT INTO ? (${str2}) VALUES(${str})`, [table_name], (err,result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//delete one sql
Router.delete('/:table/:field/:value', (req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    config.pool.query(`DELETE FROM ? WHERE ${field}=${value}`, [table_name, table_field, field_value], (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//delete all sql
Router.delete('/:table', (req, res)=>{
    let table_name=req.params.table;
    config.pool.query(`DELETE FROM ?`, [table_name], (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})