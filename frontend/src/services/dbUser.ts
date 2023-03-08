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

export interface Banned{
    ID:number,
    userID:number,
    startdate:string,
    banTime:string,
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
        res[0].data.map( e=>
            {
                let user = res[1].data.find(g=>g.ID==e.userID);
                return {
                    ID:e.ID,
                    userID: user.ID,
                    startdate: e.date,
                    banTime:e.banTime,
                    email:user.email,
                    name:user.name
                } as Banned
            }
            )as Banned[]
    )
}
export {GetUserData,GetBanned};