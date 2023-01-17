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

//select all sql
Router.get('/:table', (req, res)=>{
    let table_name=req.params.table;
    pool.query(`SELECT * FROM ${table_name}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//select one sql
Router.get('/:table/:field/:value', (req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    pool.query(`SELECT * FROM ${table_name} WHERE ${field}=${value}`, (err, result)=>{
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
    pool.query(`INSERT INTO ${table_name} (${str2}) VALUES(${str})`, (err,result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//delete one sql
Router.delete('/:table/:field/:value', (req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    pool.query(`DELETE FROM ${table_name} WHERE ${field}=${value}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//delete all sql
Router.delete('/:table', (req, res)=>{
    let table_name=req.params.table;
    config.pool.query(`DELETE FROM ${table_name}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

module.exports = Router;