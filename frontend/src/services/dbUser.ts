import type { User } from "../classes/User";
import axios from 'axios';
async function GetUserData(id:number):Promise<User>{
    return await axios.get('http://localhost:8080/api/users/ID'+id);
}


export {GetUserData};