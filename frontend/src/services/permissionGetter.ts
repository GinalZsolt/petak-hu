import axios from "axios";
export interface Permission {
    permission: number;
    username?:string;
    id?:number;
    iat?:number;
    exp?:number;
}
export async function GetPerms(Token?:string):Promise<Permission>{
    return await axios.get('http://localhost:8080/api/users/user-data', {
        headers:{
            'Authorization':'JWT '+Token
        }
    }).then(res=>res.data).catch(err=>console.error(err));
}