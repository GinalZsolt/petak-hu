import axios from 'axios';
let backendUrl = 'http://localhost:8080/api';

async function Get(token:string, table:string, field?:string, value?:string){
    let querystring = `/${table}${field ? `/${field}`:''}${value ? `/${value}` : ''}'}`;
    return axios.get(querystring, {
        headers:{
            'Authorization': 'JWT '+token
        }
    }).then(res=>res.data).catch(err=>err.response);
}
function Post(token:string){

}
function Patch(token:string){

}
function Delete(token:string){

}