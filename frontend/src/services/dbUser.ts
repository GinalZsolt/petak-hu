import type { User } from "../classes/User";
import axios from 'axios';
import { Get } from "./dbQueries";
import {Token} from '../stores';

interface Moderations{
    ID:number,
    userID:number,
    date:string,
    banTime:string
}

interface DBUser{
    ID:number,
    name:string,
    email:string
}

interface Banned{
    ID:number,
    userID:number,
    date:string,
    email:string,
    name:string,
}

async function GetUserData(id:number, token:string):Promise<User>{
    return await Get(token, 'users', 'ID', id);
}

async function GetBanned(token:string):Promise<Banned[]> {
    let moderations:Promise<Moderations[]> = axios.get('http://localhost:8080/api/moderations',{headers:{"Authorization":"JWT "+token}})
    let users:Promise<DBUser[]> = axios.get('http://localhost:8080/api/users',{headers:{"Authorization":"JWT "+token}})
    return Promise.all([moderations,users]).then(res=>
        res[0].map( e=>
            {
                return {
                    ...e,
                    ...res[1].find(x=>x.ID==e.userID)
                }
            }
            )as Banned[]
    )
}
export {GetUserData,GetBanned};