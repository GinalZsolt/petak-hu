import axios from 'axios';
let backendUrl = 'http://localhost:8080/api';

interface ExecAnswer{
    "fieldCount": number;
    "affectedRows": number;
    "insertId": number;
    "warningCount": number;
    "message": string;
}

function QueryStringGenerator(table:string, field?:string, value?:string|number){
    let querystring = `/${table}`;
    if (field!= undefined && field!= null && field!="") querystring+=`/${field}`;
    if (value!= undefined && value!= null && value!="") querystring+=`/${value}`;
    return querystring;
}

async function Get(token:string, table:string, field?:string, value?:string|number){
    return await axios.get(backendUrl+QueryStringGenerator(table,field,value), {
        headers:{
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}
async function Post(token:string, table:string, data:any):Promise<ExecAnswer>{
    return await axios.post(backendUrl+'/'+table, data, {
        headers:{
            'Authorization':'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}
async function Patch(token:string, table:string, field:string, value:string|number, data:any):Promise<ExecAnswer>{
    return await axios.patch(backendUrl + QueryStringGenerator(table, field, value), data, {
        headers:{
            'Authorization':'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}
async function Delete(token:string, table:string, field:string, value:string):Promise<ExecAnswer>{
    return await axios.post(backendUrl+QueryStringGenerator(table, field, value), {
        headers:{
            'Authorization':'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}



export {Get, Post, Patch, Delete};