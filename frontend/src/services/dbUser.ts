import type { User } from "../classes/User";
import axios from 'axios';
import { Get } from "./dbQueries";
import {Token} from '../stores';
async function GetUserData(id:number, token:string):Promise<User>{
    return await Get(token, 'users', 'ID', id);
}


export {GetUserData};