const Router = require('express').Router();
const pool = require('../config').pool;
let log = require('../modules/logging').log;
let sqlprevention = require('../modules/antisqlinjection');
let token = require('../modules/tokenCheck');
Router.patch('/:tablename/:field/:value', (req,res)=>{
    let update = [];
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
        update.push(`${sqlprevention(keys[i])}='${sqlprevention(values[i])}'`);
    }
    pool.query(`update ${req.params.tablename} set ${update.join(', ')} where ${req.params.field}=?`, [req.params.value], (err,data)=>{
        if (err){
            res.status(500).send(err.message);
        } 
        else {res.status(200).send(data); log(req.socket.remoteAddress, `Updated ${data.affectedRows} rows in ${req.params.tablename}`)}
    });
})

//select all sql
Router.get('/:table', token.tokenCheck(), (req, res)=>{
    let table_name=req.params.table;
    if (req.query.p==undefined || req.query.p==null){
        pool.query(`SELECT * FROM ${table_name}`, (err, result)=>{
            if(err) res.status(500).send(err);
            else {
                res.status(200).send(result);
                log(req.socket.remoteAddress, `sent ${result.length} rows in ${req.params.table}`);
            } 
        })
    }
    else{
        pool.query(`select * from ${table_name} limit 25 offset ${req.query.p*25}`, (err,result)=>{
            if (err) res.status(500).send(err.message);
            else{
                res.status(200).send(result);
                log(req.socket.remoteAddress, `sent ${result.length} rows in ${req.params.table}`);
            } 
        });
    }
    

})

//select by field=value
Router.get('/:table/:field/:value', token.tokenCheck(),(req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    pool.query(`SELECT * FROM ${table_name} WHERE ${sqlprevention(table_field)}='${sqlprevention(field_value)}'`, (err, result)=>{
        if(err) res.status(500).send(err);
        else{
            res.status(200).send(result);
            log(req.socket.remoteAddress, `sent ${result.length} rows from table: ${req.params.table}`);
        } 
    })
})

//insert sql
Router.post('/:table', token.tokenCheck(),(req, res)=>{
    let table_name=req.params.table;
    let records=req.body;
    let str = null;
    let str2 = "id";
    str2 = Object.keys(records).join(', ');
    str = Object.values(records).map(e=> "'"+sqlprevention(e)+"'").join(', ');
    pool.query(`INSERT INTO ${sqlprevention(table_name)} (${sqlprevention(str2)}) VALUES(${str})`, (err,result)=>{
        if(err) res.status(500).send(err);
        else{
            res.status(200).send(result);
            log(req.socket.remoteAddress,`Inserted ${result.affectedRows} rows in ${req.params.table} (id:${result.insertId})`);
        } 
    })
})

//delete one sql
Router.delete('/:table/:field/:value', token.tokenCheck(),(req, res)=>{
    let table_name=req.params.table;
    let table_field=req.params.field;
    let field_value=req.params.value;
    pool.query(`DELETE FROM ${table_name} WHERE ${table_field}=${field_value}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else {
            res.status(200).send(result);
            log(req.socket.remoteAddress, `Deleted ${result.affectedRows} rows in ${req.params.table}`);
        }
    })
})

module.exports = Router;